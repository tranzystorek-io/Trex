<h1 align="center">Trex 🦕</h1>

<p align="center">
  <img src="http://clipart-library.com/image_gallery/3119.png" width="350">
  <p align="center">Package management for deno (pronounced "tee rex") </p>
</p>

<p align="center">
   <a href="https://github.com/crewdevio/Trex/issues">
     <img alt="GitHub issues" src="https://img.shields.io/github/issues/crewdevio/Trex">
   </a>
   <a href="https://github.com/crewdevio/Trex/network">
     <img alt="GitHub forks" src="https://img.shields.io/github/forks/crewdevio/Trex">
   </a>
   <a href="https://github.com/crewdevio/Trex/stargazers">
     <img alt="GitHub stars" src="https://img.shields.io/github/stars/crewdevio/Trex">
   </a>
   <a href="https://github.com/crewdevio/Trex/blob/master/LICENSE">
     <img alt="GitHub license" src="https://img.shields.io/github/license/crewdevio/Trex">
   </a>
   <a href="https://deno.land">
     <img src="https://img.shields.io/badge/deno-%5E1.2.0-green?logo=deno"/>
   </a>
   <a href="https://nest.land/package/Trex">
     <img src="https://nest.land/badge.svg" />
   </a>
   <a href="https://cdn.discordapp.com/attachments/727169454667989016/728363543614980116/ajio.gif">
     <img src="http://hits.dwyl.com/crewdevio/Trex.svg" />
   </a>
</p>

![Use Trex](https://cdn.discordapp.com/attachments/727169454667989016/728363543614980116/ajio.gif)

## About

Trex is a package management tool for deno similar to npm but keeping close to the deno philosophy. Packages are cached and only one `import_map.json` file is generated.

```javascript
// import_map.json

{
  "imports":  {
    "http/":  "https://deno.land/std/http/"
  }
}
```

For more information about the import maps in deno see [import maps](https://deno.land/manual/linking_to_external_code/import_maps).

## Additional topics

- [Proxy](docs/proxy.md)

- [Setup your IDE](docs/setup.md)

- [Integration with nest.land](docs/nest_land_setup.md)

- [How can I have my package available to download with Trex?](docs/add_package.md)

## Installation

Install from the [nest.land](https://nest.land/) module registry (explicit version is required):

```console
deno install -A --unstable -n trex https://x.nest.land/Trex@<version>/cli.ts
```

> **note**: Works with deno >= 1.0.0.

Or from deno.land:

```console
deno install -A --unstable -n trex https://deno.land/x/trex/cli.ts
```

**we shorten the install command so it's not that long**

The permissions that Trex uses are:

- --allow-net
- --allow-read
- --allow-write
- --allow-run
- --allow-env

You can give those permissions explicitly.

## Updating Trex

Install new version with the `-f` flag:

```console
deno install -f -A --unstable -n trex https://deno.land/x/trex/cli.ts
```

Or use the `update` command:

```console
trex update
```

Note: available for versions 0.2.0 or higher.

Verify the installation of Trex:

```console
trex --version
```

and the console should print the Trex version.

For help on the commands that Trex provides, use:

```console
trex --help
```

For a better implementation of this tool you can use the [Commands](https://deno.land/x/commands) utility.

## Usage

### Installing from deno.land

Install the `fs`, `http` and `fmt` modules from std:

```console
trex install --map fs http fmt
```

> **note**: you can use `trex i --map fs http fmt`

`--map` installs packages from the standard library and those hosted at `deno.land/x`

### Installing from nest.land

Install a package hosted on [nest.land](https://nest.land/gallery):

```console
trex install --nest opine@0.13.0
```

> **note**: if you want to install a package using nest.land you must specify a version explicitly as above

You can install packages from std hosted in nest.land by specifying the package and the version:

```console
trex install --nest fs@0.61.0
```

### Installing from a repository

```console
trex install --pkg [user]/[repo or repo@tag]/[path/to/file] [packageName]
```

Example:

```console
trex install --pkg oakserver/oak/mod.ts oak
```

The above downloads oak directly from its repository.

### Example import map

All installation methods produce an import_map.json file:

```json
{
  "imports": {
    "fs/": "https://deno.land/std/fs/",
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/"
  }
}
```

### Downloading packages

Download all the packages listed in the `import_map.json` similar to `npm install`:

```console
trex install
```

### Adding custom packages

Install a package from a custom URL source:

```console
trex --custom React=https://dev.jspm.io/react/index.js
```

`import_map.json`:

```json
{
  "imports": {
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/",
    "oak": "https://deno.land/x/oak/mod.ts",
    "React": "https://dev.jspm.io/react/index.js"
  }
}
```

### **Deprecated!** Installing global scripts (cmdline tools etc.)

Trex allows installing executable scripts from its database, for example:

- [velociraptor](https://github.com/umbopepato/velociraptor)
- [Commands](https://deno.land/x/commands)

[List of installable tools](https://crewdevio.github.io/Trex-tools/)

Use the `getTool` subcommand:

```console
trex getTool Commands
```

> **note**: If you are a linux/MacOs user you'll have to specificate the PATH manually to use tools: **`export PATH="/home/username/.deno/bin:\$PATH"`**

### Deleting packages

```console
trex delete React
```

Remove a specific version from the cache and the `import_map.json` file:

```console
trex delete fs@0.52.0
```

`import_map.json`:

```json
{
  "imports": {
    "fs/": "https://deno.land/std/fs/",
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/",
    "oak": "https://deno.land/x/oak/mod.ts"
  }
}
```

Removing from cache only works with standard packages and those installed from `deno.land/x`

### Selecting a specific version of a package

Specify a package's version:

```console
trex install --map fs@0.54.0
```

`import_map.json`

```json
{
  "imports": {
    "fs/": "https://deno.land/std@0.54.0/fs/"
  }
}
```

> **note**: can be used with third party packages.

### **Deprecated!** Verifying dependency versions

```console
trex --deps
```

For the following import map:

```json
// in import_map.json
{
  "imports": {
    "oak": "https://deno.land/x/oak@v4.0.0/mod.ts",
    "http/": "https://deno.land/std@0.51.0/http/"
  }
}
```

The `--deps` flag prints out:

| name  | module |                   url                   | version  |  latest  | upToDate |
| :---: | :----: | :-------------------------------------: | :------: | :------: | :------: |
|  oak  |  oak   | "https://deno.land/x/oak@v4.0.0/mod.ts" | "v4.0.0" | "v5.0.0" |  false   |
| http/ |  std   |  "https://deno.land/std@0.54.0/http/"   | "0.54.0" | "0.54.0" |   true   |

This functionality is based on the
[deno-check-updates](https://github.com/Fzwael/deno-check-updates) tool by [Fzwael](https://github.com/Fzwael).

### Checking a package's dependency tree

```console
trex treeDeps fs
```

This prints out something like:

```console
local: C:\Users\trex\AppData\Local\deno\deps\https\deno.land\434fe4a7be02d187573484b382f4c1fec5b023d27d1dcf4f768f300799a073e0
type: TypeScript
compiled: C:\Users\trex\AppData\Local\deno\gen\https\deno.land\std\fs\mod.ts.js
map: C:\Users\trex\AppData\Local\deno\gen\https\deno.land\std\fs\mod.ts.js.map
deps:
https://deno.land/std/fs/mod.ts
  ├─┬ https://deno.land/std/fs/empty_dir.ts
  │ └─┬ https://deno.land/std/path/mod.ts
  │   ├── https://deno.land/std/path/_constants.ts
  │   ├─┬ https://deno.land/std/path/win32.ts
  │   │ ├── https://deno.land/std/path/_constants.ts
  │   │ ├─┬ https://deno.land/std/path/_util.ts
  │   │ │ └── https://deno.land/std/path/_constants.ts
  │   │ └── https://deno.land/std/_util/assert.ts
  │   ├─┬ https://deno.land/std/path/posix.ts
  │   │ ├── https://deno.land/std/path/_constants.ts
  │   │ └── https://deno.land/std/path/_util.ts
  │   ├─┬ https://deno.land/std/path/common.ts
  │   │ └─┬ https://deno.land/std/path/separator.ts
  │   │   └── https://deno.land/std/path/_constants.ts
  │   ├── https://deno.land/std/path/separator.ts
  │   ├── https://deno.land/std/path/_interface.ts
  │   └─┬ https://deno.land/std/path/glob.ts
  │     ├── https://deno.land/std/path/separator.ts
  │     ├─┬ https://deno.land/std/path/_globrex.ts
  │     │ └── https://deno.land/std/path/_constants.ts
  │     ├── https://deno.land/std/path/mod.ts
  │     └── https://deno.land/std/_util/assert.ts
  ├─┬ https://deno.land/std/fs/ensure_dir.ts
  │ └─┬ https://deno.land/std/fs/_util.ts
  │   └── https://deno.land/std/path/mod.ts
  ├─┬ https://deno.land/std/fs/ensure_file.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├─┬ https://deno.land/std/fs/ensure_link.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ ├── https://deno.land/std/fs/exists.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├─┬ https://deno.land/std/fs/ensure_symlink.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ ├── https://deno.land/std/fs/exists.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├── https://deno.land/std/fs/exists.ts
  ├─┬ https://deno.land/std/fs/expand_glob.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├─┬ https://deno.land/std/fs/walk.ts
  │ │ ├── https://deno.land/std/_util/assert.ts
  │ │ └── https://deno.land/std/path/mod.ts
  │ └── https://deno.land/std/_util/assert.ts
  ├─┬ https://deno.land/std/fs/move.ts
  │ ├── https://deno.land/std/fs/exists.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├─┬ https://deno.land/std/fs/copy.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ ├── https://deno.land/std/fs/_util.ts
  │ └── https://deno.land/std/_util/assert.ts
  ├── https://deno.land/std/fs/read_file_str.ts
  ├── https://deno.land/std/fs/write_file_str.ts
  ├── https://deno.land/std/fs/read_json.ts
  ├── https://deno.land/std/fs/write_json.ts
  ├── https://deno.land/std/fs/walk.ts
  └── https://deno.land/std/fs/eol.ts
```

### Integrity checking & lock files

Let's say your module depends on a remote module.
When you compile your module for the first time, it is retrieved, compiled and cached.
It will remain this way until you run your module on a new machine (e.g. in production) or reload the cache.

But what happens if the content in the remote url is changed?
This could lead to your production module running with different dependency code than your local module.
Deno's solution to avoid this is to use integrity checking and lock files.

Create a lockfile:

```console
trex --lock file.ts
```

The above generates a `lock.json` file.

If you use `import_map.json` in input file, you can specify it:

```console
trex --lock --importmap file.ts
```

See [deno document](https://deno.land/manual/linking_to_external_code/integrity_checking) for more info.

## Complete example

### A simple std server

Install `http` and `fmt`:

```console
trex install --map http fmt
```

Create a simple server:

```typescript
// server.ts
import { serve } from "http/server.ts";
import { green } from "fmt/colors.ts";

const server = serve({ port: 8000 });
console.log(green("http://localhost:8000/"));

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
```

Run the server:

```console
deno run --allow-net --importmap=import_map.json --unstable server.ts
```

> **note**: it is important to use **--importmap=import_map.json --unstable**

### Adding third party packages

Example using [oak](https://deno.land/x/oak)

Add the master version of oak:

```console
trex i --map oak
```

This adds `oak` to the `import_map.json` file:

```json
{
  "imports": {
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/",
    "oak": "https://deno.land/x/oak/mod.ts"
  }
}
```

> **note**: third party packages are added using **mod.ts**

Then create an oak application. Note the `import` statement.

```typescript
// app.ts
import { Application } from "oak";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

Run the server:

```console
deno run --allow-net --importmap=import_map.json --unstable app.ts
```

## Contributing

Contributions are welcome, see [CONTRIBUTING GUIDELINES](CONTRIBUTING.md).

## Licensing

Trex is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

</br>
 <p align="center">
    <img src="http://clipart-library.com/image_gallery/3119.png" width="150">
    <h3 align="center">Trex is powered by</h3>
    <p align="center">
       <a href="https://nest.land/">
	  <img src="https://cdn.discordapp.com/attachments/656976424778989602/735587312448176132/favicon_light.svg" width="85" height="85">
       </a>
       <a href="https://deno.land/">
	  <img src="https://raw.githubusercontent.com/denoland/deno_website2/master/public/logo.svg" width="85" height="85">
       </a>
       <a href="https://denopkg.com/">
	  <img src="https://raw.githubusercontent.com/denopkg/denopkg.com/master/public/denopkg.png" width="90" height="90">
       </a>
    </p>
  </p>
