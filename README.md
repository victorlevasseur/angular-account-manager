# angular-account-manager

Quick and simple account manager based on Angular2, Materialize.css and Electron.

Configuration based on this: https://github.com/joaogarin/angular-electron

## Compile and run the app

```bash
$ npm install
$ npm run build
$ npm run watch
$ npm run electron
```

## Packaging

The app has support for packaging using 'electron-packager'

```bash
$ npm run package
```

Will run the package for OSX. You can also provide additional options to the package command such as

*  --name : The package name
*  --all : Will packaget the application to all the platforms
*  --arch : Arches to be provided
*  --icon : The icon for the app

## License

[GNU GPLv3]
