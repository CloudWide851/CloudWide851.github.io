import { useWasmCompiler as useWasmCompilerContext } from '../context/WasmContext';

export function useWasmCompiler() {
  return useWasmCompilerContext();
}
