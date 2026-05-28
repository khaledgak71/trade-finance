export function markdownToHtml(md: string): string {
  let html = md
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Tables
  html = html.replace(/\n(\|.+\|\n)(\|[-| :]+\|\n)((\|.+\|\n?)*)/g, (_, header, sep, rows) => {
    const ths = header.trim().split('|').filter(Boolean).map((h: string) =>
      `<th>${h.trim()}</th>`
    ).join('')
    const trs = rows.trim().split('\n').filter(Boolean).map((row: string) => {
      const tds = row.split('|').filter(Boolean).map((c: string) =>
        `<td>${c.trim()}</td>`
      ).join('')
      return `<tr>${tds}</tr>`
    }).join('')
    return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`
  })

  // Headings
  html = html
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')

  // HR
  html = html.replace(/^---$/gm, '<hr />')

  // Bold and italic
  html = html
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')

  // Inline code (restore < > inside code)
  html = html.replace(/`([^`]+)`/g, (_, code) =>
    `<code>${code.replace(/&lt;/g, '<').replace(/&gt;/g, '>')}</code>`
  )

  // Unordered lists
  html = html.replace(/(^[-*+] .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map(line =>
      `<li>${line.replace(/^[-*+] /, '').trim()}</li>`
    ).join('')
    return `<ul>${items}</ul>`
  })

  // Ordered lists
  html = html.replace(/(^\d+\. .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map(line =>
      `<li>${line.replace(/^\d+\. /, '').trim()}</li>`
    ).join('')
    return `<ol>${items}</ol>`
  })

  // Paragraphs (wrap non-html lines)
  html = html.split('\n\n').map(block => {
    block = block.trim()
    if (!block) return ''
    if (/^<[hup\w]/.test(block) || block.startsWith('<table') || block.startsWith('<blockquote') || block.startsWith('<hr') || block.startsWith('<ol')) {
      return block
    }
    return `<p>${block.replace(/\n/g, ' ')}</p>`
  }).join('\n')

  return html
}
