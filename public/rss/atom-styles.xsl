<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/atom:feed">
    <html>
      <head>
        <title><xsl:value-of select="atom:title"/></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <style type="text/css">
          * {
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: #fafafa;
            color: #1a1a1a;
            font-size: 15px;
            min-height: 100vh;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
          }

          header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem 0;
          }

          h1 {
            font-size: 2.5rem;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 0.5rem 0;
            letter-spacing: -0.02em;
          }

          h1 a {
            color: inherit;
            text-decoration: none;
          }

          h1 a:hover {
            color: #666;
            transition: color 0.2s ease;
          }

          .subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0.5rem 0 1.5rem 0;
            font-weight: 400;
            line-height: 1.5;
          }

          .feed-type-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            background: #10b981;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 0.5rem;
          }

          .feed-info {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
          }

          .feed-info h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1rem;
            font-weight: 600;
            color: #1a1a1a;
          }

          .feed-info p {
            margin: 0;
            color: #666;
            font-size: 0.875rem;
            line-height: 1.5;
          }

          .articles {
            margin-top: 2rem;
          }

          .article-item {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: all 0.2s ease;
          }

          .article-item:hover {
            border-color: #ccc;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .article-item:last-child {
            margin-bottom: 0;
          }

          .article-title {
            margin: 0 0 0.5rem 0;
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.4;
          }

          .article-title a {
            color: #1a1a1a;
            text-decoration: none;
          }

          .article-title a:hover {
            color: #0066cc;
            transition: color 0.2s ease;
          }

          .article-meta {
            color: #888;
            font-size: 0.8125rem;
            margin-bottom: 0.75rem;
            font-weight: 400;
          }

          .article-description {
            color: #555;
            font-size: 0.9375rem;
            line-height: 1.6;
            margin: 0 0 1rem 0;
          }

          .article-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.75rem;
          }

          .tag {
            background: #f1f3f4;
            color: #5f6368;
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 500;
            text-decoration: none;
          }

          footer {
            margin-top: 4rem;
            padding: 2rem 0;
            text-align: center;
            border-top: 1px solid #e9ecef;
            color: #888;
            font-size: 0.8125rem;
          }

          footer a {
            color: #666;
            text-decoration: none;
          }

          footer a:hover {
            color: #1a1a1a;
            text-decoration: underline;
          }

          @media (max-width: 640px) {
            .container {
              padding: 1.5rem 1rem;
            }

            header {
              margin-bottom: 2rem;
              padding: 1rem 0;
            }

            h1 {
              font-size: 2rem;
            }

            .article-item {
              padding: 1.25rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>
              <a href="{atom:link[@rel='alternate']/@href}" target="_blank">
                <xsl:value-of select="atom:title"/>
              </a>
            </h1>
            <p class="subtitle"><xsl:value-of select="atom:subtitle"/></p>
            <div class="feed-type-badge">⚡ Atom 1.0</div>
          </header>

          <div class="feed-info">
            <h3>Atom 订阅源</h3>
            <p>将此页面的 URL 添加到您的 RSS 阅读器中来订阅更新，阅读器将显示完整文章内容。</p>
          </div>

          <div class="articles">
            <xsl:for-each select="atom:entry">
              <article class="article-item">
                <h2 class="article-title">
                  <a href="{atom:link/@href}" target="_blank">
                    <xsl:value-of select="atom:title"/>
                  </a>
                </h2>
                <div class="article-meta">
                  发布于：<xsl:value-of select="substring(atom:published, 1, 10)"/>
                  <xsl:if test="atom:updated != atom:published">
                    ，更新于：<xsl:value-of select="substring(atom:updated, 1, 10)"/>
                  </xsl:if>
                </div>
                <p class="article-description">
                  <xsl:value-of select="atom:summary"/>
                </p>
                <xsl:if test="atom:category">
                  <div class="article-tags">
                    <xsl:for-each select="atom:category">
                      <span class="tag"><xsl:value-of select="@term"/></span>
                    </xsl:for-each>
                  </div>
                </xsl:if>
              </article>
            </xsl:for-each>
          </div>

          <footer>
            <p>Generated by Astro with Atom 1.0 format</p>
            <p>Powered by <a href="https://github.com/Dnzzk2/Litos" target="_blank">Litos Theme</a></p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>