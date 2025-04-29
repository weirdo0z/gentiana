import { observable } from "@legendapp/state"

export const globalState$ = observable({})

export default function App() {
  /** async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { name }))
  } */

  return (
    <main>
      <h1>:D</h1>
    </main>
  )
}
