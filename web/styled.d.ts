import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        hex: string
        rgb: {
          r: number
          g: number
          b: number
        }
      }
    }
    font: {
      size: {
        primary: string
      }
      family: {
        primary: string
      }
    }
  }
}
