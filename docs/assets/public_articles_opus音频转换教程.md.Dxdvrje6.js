import{_ as s,c as n,o as p,ag as e}from"./chunks/framework.DQR1PrH6.js";const o="/assets/Snipaste_2025-04-30_12-31-46.cBDc-C6n.png",f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"public/articles/opus音频转换教程.md","filePath":"public/articles/opus音频转换教程.md"}'),t={name:"public/articles/opus音频转换教程.md"};function l(i,a,r,c,u,d){return p(),n("div",null,a[0]||(a[0]=[e('<h2 id="opus音频的转换" tabindex="-1">opus音频的转换 <a class="header-anchor" href="#opus音频的转换" aria-label="Permalink to &quot;opus音频的转换&quot;">​</a></h2><p>在一些环境中（如游戏解包中），我们将会遇到.opus、.ogg、.wav这样的奇奇怪怪的音频格式。这篇文章记录了如何将此类格式的文件转换为mp3、flac等常见音频格式。</p><h3 id="背景介绍" tabindex="-1">背景介绍 <a class="header-anchor" href="#背景介绍" aria-label="Permalink to &quot;背景介绍&quot;">​</a></h3><p>opus是一种音频编码格式，官网是<a href="https://www.opus-codec.org" target="_blank" rel="noreferrer">https://www.opus-codec.org</a>。它不能直接被市面上的播放器播放，也不能被处理。</p><h4 id="几个名词解释" tabindex="-1">几个名词解释 <a class="header-anchor" href="#几个名词解释" aria-label="Permalink to &quot;几个名词解释&quot;">​</a></h4><p>opus：一种音频格式文件编解码器，也指这种音频格式。 opus-tools：为转换opus格式音频文件而开发的工具的统称，包含opusdec（opus 至 wav）、opusenc、opusinfo等工具。 lbopus：是opus编解码器（opus标准）的源码实现（不包含可执行文件）</p><p>你可以从<a href="https://opus-codec.org/docs/" target="_blank" rel="noreferrer">Opus documentation</a>看到对以上概念的介绍及文档。</p><h3 id="已有方案的不足" tabindex="-1">已有方案的不足 <a class="header-anchor" href="#已有方案的不足" aria-label="Permalink to &quot;已有方案的不足&quot;">​</a></h3><p>笔者曾尝试过使用<code>ffmpeg</code>进行转换，但难度不小，尤其是对于windows用户来说。大部分的ffmpeg二进制版本都不支持opus类音频文件的编解码，需要我们自己进行手动编译。我曾尝试过使用mysys2在windows上进行编译，但遇到了各种奇奇怪怪的问题，最后宣告失败。（似乎linux会简单一些）编译的水很深，我不建议你尝试。</p><p>libopus有自己的python库，叫<code>opuslib</code>，但是并没有提供接口文档.我百度搜了一下发现，如果使用python大法的话还要处理音频采样率参数之类复杂的问题，最后当然也宣告失败。</p><h3 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h3><p>几番搜索之下，我终于在官网上找到了官方的编码与解码工具，说实话，这藏得够深的。 工具下载的链接：<a href="https://opus-codec.org/downloads/" target="_blank" rel="noreferrer">https://opus-codec.org/downloads/</a></p><p>点击下载opus-tool： <img src="'+o+`" alt="opus"></p><p>下载完成后，zip里面的<code>opusdec.exe</code>是解码工具，可以将opus文件转换为wav格式。 常用命令如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt;&gt;&gt; opusdec.exe []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Usage: opusdec [options] input [output]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Decode audio in Opus format to Wave or raw PCM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>input can be:</span></span>
<span class="line"><span>  file:filename.opus   Opus URL</span></span>
<span class="line"><span>  filename.opus        Opus file</span></span>
<span class="line"><span>  -                    stdin</span></span>
<span class="line"><span></span></span>
<span class="line"><span>output can be:</span></span>
<span class="line"><span>  filename.wav         Wave file</span></span>
<span class="line"><span>  -                    stdout (raw; unless --force-wav)</span></span>
<span class="line"><span>  (default)            Play audio</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Options:</span></span>
<span class="line"><span> -h, --help            Show this help</span></span>
<span class="line"><span> -V, --version         Show version information</span></span>
<span class="line"><span> --quiet               Suppress program output</span></span>
<span class="line"><span> --rate n              Force decoding at sampling rate n Hz</span></span>
<span class="line"><span> --force-stereo        Force decoding to stereo</span></span>
<span class="line"><span> --gain n              Adjust output volume n dB (negative is quieter)</span></span>
<span class="line"><span> --no-dither           Do not dither 16-bit output</span></span>
<span class="line"><span> --float               Output 32-bit floating-point samples</span></span>
<span class="line"><span> --force-wav           Force Wave header on output</span></span>
<span class="line"><span> --packet-loss n       Simulate n % random packet loss</span></span>
<span class="line"><span> --save-range file     Save check values for every frame to a file</span></span></code></pre></div><h3 id="python批处理程序" tabindex="-1">python批处理程序 <a class="header-anchor" href="#python批处理程序" aria-label="Permalink to &quot;python批处理程序&quot;">​</a></h3><p>我写了一个简单的批处理程序；将它与opusdec结合，可以批量把opus文件转换为wav文件。 源码及使用教程自取： Github：<a href="https://github.com/windlightly/opus2wav" target="_blank" rel="noreferrer">opus2wav</a></p>`,17)]))}const g=s(t,[["render",l]]);export{f as __pageData,g as default};
