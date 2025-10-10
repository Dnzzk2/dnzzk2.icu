<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes" />
  <xsl:template name="format-date">
    <xsl:param name="date" />
    <xsl:variable name="short" select="substring($date, 1, 16)" />
    <xsl:variable name="year" select="substring($short, 1, 4)" />
    <xsl:variable name="month" select="substring($short, 6, 2)" />
    <xsl:variable name="day" select="substring($short, 9, 2)" />
    <xsl:variable name="hour" select="substring($short, 12, 2)" />
    <xsl:variable name="minute" select="substring($short, 15, 2)" />
    <xsl:value-of
      select="concat($year, ' 年 ', number($month), ' 月 ', number($day), ' 日 ', $hour, ':', $minute)" />
  </xsl:template>
  <xsl:template match="/atom:feed">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>Atom Feed | <xsl:value-of select="atom:title" /></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preload" href="/fonts/GeistVF.woff2" as="font" type="font/woff2" />
        <link rel="preload" href="/fonts/Lexend-VariableFont_wght.woff2" as="font" type="font/woff2" />
        <link rel="preload" href="/fonts/ZhudouSansVF-subset.woff2" as="font" type="font/woff2" />
        <link rel="preload" href="/fonts/GeistMono[wght].woff2" as="font" type="font/woff2" />
        <link rel="stylesheet" href="/fonts/ShangguSansSC-VF/result.css" />
        <style type="text/css">
          * {
          box-sizing: border-box;
          }

          @font-face {
          font-family: 'Numbers';
          src: url('/fonts/GeistVF.woff2') format('woff2');
          font-display: swap;
          }

          @font-face {
          font-family: 'CJKEmDash';
          unicode-range: U+2014, U+2E3A-2E3B;
          src: url('/fonts/ZhudouSansVF-subset.woff2') format('woff2');
          font-display: swap;
          }

          /* 标题字体 */
          @font-face {
          font-family: 'Lexend';
          src: url('/fonts/Lexend-VariableFont_wght.woff2') format('woff2');
          font-display: swap;
          }

          @font-face {
          font-family: 'GeistMono';
          src: url('/fonts/GeistMono[wght].woff2') format('woff2');
          font-weight: 400;
          font-display: swap;
          }

          body{
          font-family:"CJKEmDash', 'Numbers', 'ShangguSansSC-VF', sans-serif";
          scroll-behavior: smooth;
          background-color: #ffffff
          }

          .container{
          margin:0 auto;
          max-width:48rem;
          }

        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>
              <a href="{atom:link[@rel='alternate']/@href}" target="_blank">
                <xsl:value-of select="atom:title" />
              </a>
            </h1>
            <p class="subtitle">
              <xsl:value-of select="atom:subtitle" />
            </p>
          </header>
          <div class="articles">
            <xsl:for-each select="atom:entry">
              <article class="article-item">
                <h2 class="article-title">
                  <a href="{atom:link/@href}" target="_blank">
                    <xsl:value-of select="atom:title" />
                  </a>
                </h2>
                <div class="article-meta"> 发布于：<xsl:value-of
                    select="substring(atom:published, 1, 10)" />
                  <xsl:if
                    test="atom:updated != atom:published"> ，更新于：<xsl:value-of
                      select="substring(atom:updated, 1, 10)" />
                  </xsl:if>
                </div>
                <p class="article-description">
                  <xsl:value-of select="atom:summary" />
                </p>
                <xsl:if test="atom:category">
                  <div class="article-tags">
                    <xsl:for-each select="atom:category">
                      <span class="tag">
                        <xsl:value-of select="@term" />
                      </span>
                    </xsl:for-each>
                  </div>
                </xsl:if>
              </article>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>