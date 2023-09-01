export function getContentsDiv(className?: string) {
  const div = document.createElement('div')
  div.style.display = 'contents'
  if (className) {
    div.className = className
  }
  return div
}
