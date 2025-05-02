import { observable } from '@legendapp/state'
import { LazyStore } from '@tauri-apps/plugin-store'
import { useEffect } from 'preact/hooks'

interface GlobalState {
  page: 'main' | 'setting'
}

const initialGlobalState: GlobalState = {
  page: 'main',
}

export const globalState$ = observable<GlobalState>(initialGlobalState)

export default function App() {
  /** async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { name }))
  } */

  useEffect(() => {
    const store = new LazyStore('setting.dat')

    // Load the setting
    ;(async () =>
      globalState$.set(
        (await store.get<GlobalState>('setting')) ?? initialGlobalState,
      ))()

    // Memorize what we were doing
    const onExit = async () => {
      await store.set('setting', globalState$.peek())
    }

    window.addEventListener('beforeunload', onExit)

    return () => {
      window.removeEventListener('beforeunload', onExit)
    }
  }, [])

  return (
    <main>
      <h1>:D</h1>
    </main>
  )
}
