# flashcards

## Desk

The desk currently has the minimum amount of files necessary to distribute an application and should be distributable immediately. Any further Hoon development should happen here.

TODO: Add further documentation on beginning Hoon development

## UI

flashcards is built primarily using [React], JavaScript, and [Tailwind CSS]. [Vite] ensures that all code and assets are loaded appropriately, bundles the application for distribution and provides a functional dev environment.

### Getting Started

To get started using flashcards first you need to run `npm install` inside the `ui` directory.

To develop you'll need a running ship to point to. To do so you first need to add a `.env.local` file to the `ui` directory. This file will not be committed. Adding `VITE_SHIP_URL={URL}` where **{URL}** is the URL of the ship you would like to point to, will allow you to run `npm run dev`. This will proxy all requests to the ship except for those powering the interface, allowing you to see live data.

Your browser may require CORS requests to be enabled for the use of `@urbit/http-api`. The following commands will add `http://localhost:3000` to the CORS registry of your ship

```bash
~zod:dojo> +cors-registry

[requests={~~http~3a.~2f.~2f.localhost ~~http~3a.~2f.~2f.localhost~3a.3000} approved={} rejected={}]

~zod:dojo> |cors-approve ~~http~3a.~2f.~2f.localhost~3a.3000 

~zod:dojo> +cors-registry

[requests={~~http~3a.~2f.~2f.localhost} approved={~~http~3a.~2f.~2f.localhost~3a.3000} rejected={}]

~your-sig:dojo>
```

Regardless of what you run to develop, Vite will hot-reload code changes as you work so you don't have to constantly refresh.

### Deploying

Note: the dev server runs on port 3000 but, while deploying, we'll be talking directly to the urbit server at port 8080.

- bash: `bash start-fake-ship.sh` to create or launch a fake urbit ship, keep this terminal open & use it to enter all dojo commands
- dojo: `+code` to generate an access code, visit `http://localhost:8080` and enter this code to login.
- bash: `cd ui && npm install && npm run build` to install ui deps & build a prod bundle in `ui/dist` (from a 2nd terminal tab bc first one should still have dojo open)
- dojo: `|merge %work our %base` to create a new work desk (aka repo) from a fork of the built-in base desk
- dojo: `|mount %work` to make our work desk accessible from the host filesystem at `data/zod/work` where `data/zod` is the fake urbit's pier.
- bash: `rsync -avL --delete ui/dist/ data/zod/work/flashcards` to copy prod js bundle into the urbit work desk
- dojo: `|commit %work` to import filesystem changes into urbit, you should see new files logged in dojo
- dojo: `=dir /=garden=` to change to the garden desk, arg to `=dir` (aka `cd`) is a 3-part `beak` (like a `path`) composed of the ship, desk, and revision (`=` for any of these three uses the default value)
- dojo: `-make-glob %work /flashcards` to call the `-make-glob` utility function that the garden desk provides, this util groups files from the flashcards dir of the work desk into one file & puts that file into the host filesystem at `data/zod/.urb/put/`. The file name looks like `glob-0v5.fdf99.nph65.qecq3.ncpjn.q13mb.glob` where the characters between `glob-` and `.glob` are a hash of the glob's contents.
- bash: `bash publish.sh data/zod/.urb/put/glob-0v1.hgamp.m7c2c.bomag.81l5r.d71h6.glob $BLOG_URL/ipfs` to upload the glob to ipfs
  - where `$BLOG_URL` can include a username and password eg `https://admin:password@myblog.com`
  - change the glob name to one from your own `zod/.urb/put` dir
- bash: `vim desk/desk.docket-0`
  - Both the full URL and the hash of the `glob-http` key should be updated to match the glob we just created
  - That line should look something like this when you're done: `glob-http+['https://myblog.com/ipfs/Qmabc123' 0v5.fdf99.nph65.qecq3.ncpjn.q13mb]`
  - Update info & other stuff if needed
- dojo: `|merge %flashcards our %garden` to create new production desk, we need to use garden as the base bc it has necessary libs
- dojo: `|mount %flashcards` to make prod desk available for update via the host fs
- bash: `cp -f desk/* data/zod/flashcards/` to copy our updated docket into the prod desk
- bash: `rsync -avL --delete ui/dist/ data/zod/flashcards/flashcards` to copy prod js bundle into the prod desk
- dojo: `|commit %flashcards` to load fs updates into urbit
- dojo: `|install our %flashcards` to activate this desk as an app
- browser: visit your homepage at http://localhost:8080 and explore your newly installed app

[Other docs](https://developers.urbit.org/guides/core/app-school-full-stack/8-desk) to check out if the above doesn't work..

[react]: https://reactjs.org/
[tailwind css]: https://tailwindcss.com/
[vite]: https://vitejs.dev/
