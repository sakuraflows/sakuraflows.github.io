import{_ as a,c as e,o as n,ag as p}from"./chunks/framework.Ds6Eueu6.js";const t="/assets/typecho%E6%95%B0%E6%8D%AE%E5%BA%93.CsFIsQDI.jpeg",l="/assets/%E7%B4%A2%E5%BC%95%E9%A1%B5%E9%9D%A2.DVQmZity.jpeg",i="/assets/403%E9%94%99%E8%AF%AF.Csj_EmxN.jpeg",m=JSON.parse('{"title":"serv00部署typecho不得不注意的安全事项","description":"","frontmatter":{},"headers":[],"relativePath":"public/articles/serv00部署typecho不得不注意的安全事项.md","filePath":"public/articles/serv00部署typecho不得不注意的安全事项.md"}'),c={name:"public/articles/serv00部署typecho不得不注意的安全事项.md"};function r(o,s,h,d,u,_){return n(),e("div",null,s[0]||(s[0]=[p(`<h1 id="serv00部署typecho不得不注意的安全事项" tabindex="-1">serv00部署typecho不得不注意的安全事项 <a class="header-anchor" href="#serv00部署typecho不得不注意的安全事项" aria-label="Permalink to &quot;serv00部署typecho不得不注意的安全事项&quot;">​</a></h1><h4 id="省流" tabindex="-1">省流： <a class="header-anchor" href="#省流" aria-label="Permalink to &quot;省流：&quot;">​</a></h4><p>1,在typecho安装向导中选择的sqlite数据库是由typecho自动生成的，此数据库除了密码之外的大部分数据，例如用户名，文章，评论预留的邮箱等均为明文存储。如果选择“远程链接数据库”并设置密码，则无此问题。在搭建个人博客的时候应该注意此安全问题。</p><p>2，serv00的默认的网络配置可能存在问题，即可以通过URL来直接访问敏感文件（例如数据库的.db文件）。 解决方案：在public_html或者你部署服务的根文件夹下新建文件名为“.htaccess”文件（或者上传在本地编辑好的文件也行），并写入以下内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RewriteEngine On</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 限制敏感文件的访问</span></span>
<span class="line"><span>RewriteRule \\.db$ - [F,L] </span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Files ~ &quot;^\\.htaccess&quot;&gt;</span></span>
<span class="line"><span>    Order allow,deny</span></span>
<span class="line"><span>    Deny from all</span></span>
<span class="line"><span>    Satisfy All</span></span>
<span class="line"><span>&lt;/Files&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 关闭目录索引</span></span>
<span class="line"><span>&lt;Files *&gt;</span></span>
<span class="line"><span>Options -Indexes</span></span>
<span class="line"><span>&lt;/Files&gt;</span></span></code></pre></div><p>即可缓解问题。</p><h4 id="测试配置是否有效" tabindex="-1">测试配置是否有效 <a class="header-anchor" href="#测试配置是否有效" aria-label="Permalink to &quot;测试配置是否有效&quot;">​</a></h4><p>在serv00的官方文档中，对于htacess文件是这么说的： &quot; The <em>.htaccess</em> file is supported on <em>PHP</em> type of website.&quot; <br> 所以对于其他非PHP项目或二进制部署文件，我也不知道使用此方法是否管用。所以在配置后应当进行测试，看是否可以通过URL访问敏感文件，如果返回错误，则说明配置应该起作用了。</p><br><h4 id="以下为原文" tabindex="-1">以下为原文： <a class="header-anchor" href="#以下为原文" aria-label="Permalink to &quot;以下为原文：&quot;">​</a></h4><p>——----------------------------------------------------------</p><h4 id="serv00部署typecho不得不注意的安全事项-1" tabindex="-1">serv00部署typecho不得不注意的安全事项 <a class="header-anchor" href="#serv00部署typecho不得不注意的安全事项-1" aria-label="Permalink to &quot;serv00部署typecho不得不注意的安全事项&quot;">​</a></h4><p>如题</p><p>本人最近打算用serv00的服务器搭建一个typecho框架的个人论坛。</p><p>在搭的时候遇到了些奇奇怪怪的问题，于是便打开了typecho的Github项目页，想从issues里面找点解决方案。</p><p>但是我发现了这个东西： <a href="https://github.com/typecho/typecho/issues/1806" target="_blank" rel="noreferrer">SQLite文件可直接被下载 #1806</a></p><p>在这条被关闭的issue里面，反馈者发现可以通过输入格式为[主机名]+/user/+[str].db（typecho数据库的路径）的URL，即可直接下载typecho的sqlite数据库。</p><p>本人试了一下，发现真的可以。</p><p>进一步地，我想看看这个数据库是明文数据库还是被加密的数据库。于是我用SQLiteStudio打开了我在上一个步骤下载的数据库，发现确实是明文的.....</p><p>于是本人又查询了typecho的文档， <a href="https://docs.typecho.org/database" target="_blank" rel="noreferrer">Typecho数据库设计</a></p><p>发现存在数据库中的不仅有公开的文章，还有用户密码、评论，邮箱等信息。不过用户密码是加密的。</p><p><img src="`+t+`" alt=""></p><p>无独有偶，serv00的Apache http sever的配置似乎存在问题，导致外网可以直接访问数据库文件。 <a href="https://linux.do/t/topic/402126" target="_blank" rel="noreferrer">NewApi .db 能直接下载</a></p><p>于是我去翻了serv00官方的技术文档，发现因它好像没有提供直接修改apache配置文件的途径。 我试着用ssh来访问配置文件所在的路径，但是显示权限不够。（我不太熟悉freebsd，如果可以修改serv00里面的httpd.conf的话，请告诉我）</p><p><a href="https://docs.serv00.com/htaccess/" target="_blank" rel="noreferrer">WWW Pages ——.htaccess</a></p><p>在官方文档里，它提供了这个来让用户自定义网络配置。</p><p>于是参考技术文档，本人摸索到了一个解决方案：</p><p>在public_html或者你部署服务的根文件夹下新建文件名为“.htaccess”文件 （或者上传在本地编辑好的文件也行），并写入以下内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RewriteEngine On</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 限制敏感文件的访问</span></span>
<span class="line"><span>RewriteRule \\.db$ - [F,L] </span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Files ~ &quot;^\\.htaccess&quot;&gt;</span></span>
<span class="line"><span>    Order allow,deny</span></span>
<span class="line"><span>    Deny from all</span></span>
<span class="line"><span>    Satisfy All</span></span>
<span class="line"><span>&lt;/Files&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 关闭目录索引</span></span>
<span class="line"><span>&lt;Files *&gt;</span></span>
<span class="line"><span>Options -Indexes</span></span>
<span class="line"><span>&lt;/Files&gt;</span></span></code></pre></div><p>即可缓解问题。</p><h4 id="测试配置是否有效-1" tabindex="-1">测试配置是否有效 <a class="header-anchor" href="#测试配置是否有效-1" aria-label="Permalink to &quot;测试配置是否有效&quot;">​</a></h4><p>在serv00的官方文档中，对于htacess文件是这么说的： &quot; The <em>.htaccess</em> file is supported on <em>PHP</em> type of website.&quot; 所以对于其他非PHP项目或二进制部署文件，我也不知道使用此方法是否管用。所以在配置后应当进行测试，看是否可以通过URL访问敏感文件，如果返回错误，则说明配置应该起作用了。</p><p>示例： 这是部署规则前： 输入域名/usr，会显示这样： <img src="`+l+'" alt="索引页面"></p><p>部署规则之后： <img src="'+i+'" alt="403"> 说明我们配置成功了。</p>',34)]))}const y=a(c,[["render",r]]);export{m as __pageData,y as default};
