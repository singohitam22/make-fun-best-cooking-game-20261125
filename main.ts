// The Cracked Yolk — entry program for best-cooking-game-20261125-0137
// (Node 22, standard library only). It hands the game in: copies game/ and
// screenshots/ from beside this file to /output (or MAKEFUN_OUTPUT_DIR) and
// writes /output/dossier.json with the vendored make.fun library.
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Gate caps from the competition rules: at most 4 screenshots, each at most
// 256 KiB; game/ at most 993 files and 48 MiB in all; every path under game/
// at most 1000 bytes; the dossier text at most 160 KiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
