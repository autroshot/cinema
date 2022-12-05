export function triggerClickWhenEnterKeyDown(
  e: React.KeyboardEvent<HTMLElement>
) {
  if (e.key === 'Enter') {
    e.currentTarget.click();
  }
}
