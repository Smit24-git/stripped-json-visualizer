import { ColorSchemeScript } from "@mantine/core"
import JsonCrack from "./JsonCrack"
import './global.css';

export const metadata = {
  title: 'Json Visualizer',
  description: 'Json Data Visualizer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
          <ColorSchemeScript />
      </head>
      <body>
        <JsonCrack>{children}</JsonCrack>
      </body>
    </html>
  )
}
