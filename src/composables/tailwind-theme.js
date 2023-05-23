// useTailwindTheme.js
/**
 * This composable function toggles the Tailwind CSS theme
 * and applies a background color to the HTML element
 * based on the current theme and in sync with vuetfiy's theme settings.
 *
 * @param {Ref} theme - The current theme selected by the user.
 */

const html = document.documentElement

export const useTailwindTheme = (theme) => {
  // update the Tailwind theme based on the current user selection
  watchEffect(() => {
    const isLightTheme = theme.value === 'light'
    if (isLightTheme) {
      html.classList.remove('dark')
      return
    }
    html.classList.add('dark')
  })

  // update the HTML background color based on the current user selection
  watchEffect(() => {
    const isLightTheme = theme.value === 'light'
    const backgroundClass = isLightTheme ? 'bg-light' : 'bg-dark'
    html.classList.replace('bg-light', backgroundClass)
    html.classList.replace('bg-dark', backgroundClass)
  })
}
