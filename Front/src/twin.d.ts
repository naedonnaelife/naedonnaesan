// twin.d.ts
import { styled as styledImport } from 'twin.macro';

declare module 'twin.macro' {
  const styled: typeof styledImport;
}
