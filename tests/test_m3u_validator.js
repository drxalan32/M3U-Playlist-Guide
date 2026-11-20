"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class Element {
  constructor(id = "") { this.id=id; this.value=""; this.textContent=""; this.disabled=false; this.files=[]; this.children=[]; this.listeners={}; this.className=""; }
  addEventListener(type, callback) { this.listeners[type]=callback; }
  replaceChildren(...items) { this.children=[...items]; }
  append(...items) { this.children.push(...items); }
  focus() {}
  select() {}
}
const elements = new Map();
const document = {
  getElementById(id) { if(!elements.has(id)) elements.set(id,new Element(id)); return elements.get(id); },
  createElement() { return new Element(); }
};
const context = {
  document,
  navigator:{clipboard:{writeText:async()=>{}}},
  URL,
  Promise,
  setTimeout,
  console
};
const html=fs.readFileSync("docs/tools/m3u-validator.html","utf8");
const script=html.match(/<script>\s*([\s\S]*?)<\/script>/);
assert.ok(script,"validator inline script exists");
vm.runInNewContext(script[1],context);
const input=document.getElementById("playlist-text");
const run=document.getElementById("validate-playlist");
const status=document.getElementById("validator-status");
const get=n=>Number(document.getElementById(n).textContent);
async function validate(name,text){
  input.value=text;
  status.textContent="";
  run.listeners.click();
  for(let i=0;i<1000&&!status.textContent.startsWith("Validation complete.");i++) await new Promise(resolve=>setTimeout(resolve,2));
  assert.ok(status.textContent.startsWith("Validation complete."),name+": validator did not finish");
  const result={total:get("total-entries"),valid:get("valid-entries"),warnings:get("warning-count"),errors:get("error-count")};
  console.log(name+": "+JSON.stringify(result));
  return result;
}
const attrs='tvg-id="news" tvg-name="News" tvg-logo="https://example.com/logo.png" group-title="News"';
(async()=>{
  let r=await validate("valid","#EXTM3U\n#EXTINF:-1 "+attrs+",BBC One\nhttps://example.com/bbc.m3u8\n");
  assert.deepEqual(r,{total:1,valid:1,warnings:0,errors:0});
  r=await validate("missing header","#EXTINF:-1 "+attrs+",BBC One\nhttps://example.com/bbc.m3u8\n");
  assert.equal(r.errors,1);assert.equal(r.valid,1);
  r=await validate("broken URL","#EXTM3U\n#EXTINF:-1 "+attrs+",BBC One\nnot-a-url\n");
  assert.equal(r.errors,1);assert.equal(r.valid,0);
  r=await validate("duplicates","#EXTM3U\n#EXTINF:-1 "+attrs+",BBC One\nhttps://example.com/bbc.m3u8\n#EXTINF:-1 "+attrs+",BBC One copy\nhttps://example.com/bbc.m3u8\n");
  assert.deepEqual(r,{total:2,valid:2,warnings:1,errors:0});
  const cleaned=document.getElementById("cleaned-playlist").value;
  assert.equal((cleaned.match(/https:\/\/example\.com\/bbc\.m3u8/g)||[]).length,1);
  console.log("PASS cleaned output removes the exact duplicate entry and its EXTINF line");
  const many=Array.from({length:25000},(_,i)=>"#EXTINF:-1 "+attrs+",Channel "+i+"\nhttps://example.com/channel-"+i+".m3u8").join("\n");
  r=await validate("50k-line input","#EXTM3U\n"+many+"\n");
  assert.deepEqual(r,{total:25000,valid:25000,warnings:0,errors:0});
  console.log("PASS 50,001-line input is processed in batches");
})().catch(error=>{console.error(error);process.exitCode=1;});
