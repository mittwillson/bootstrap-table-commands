# bootstrap-table-commands
bootstrap-table commands plugin | bootstrap-table 的 commands 插件

## Version  0.0.1

## LICENSE

**NOTE:** Bootstrap Table Commands is licensed under the [The MIT License](https://github.com/MittWillson/bootstrap-table-commands/blob/master/LICENSE). Completely free, you can arbitrarily use and modify this plugin. If this plugin is useful to you, you can **Star** this repo, your support is my biggest motive force, thanks.

## example

* [see example page](https://mittwillson.github.io/bootstrap-table-commands/)
* [see example code](https://github.com/MittWillson/bootstrap-table-commands/blob/master/index.html)

## makeCommands Configs

name | type | description
:--: | :--: | :-----:
options | Object | just like `table-column` config
commands | Object | for create commands
defaultTemplate | function | (`command`, `tableRow`), see `js code`

## makeCommands-commands Configs
name | type | description
:--: | :--: | :-----
title | string(or function) | if value is a function, then you can get (`command` (see `makeCommands-command Object Values`), `tableRow` (see `makeCommands-tableRow Object Values`)) to dynamic create a title
callback | function | when user click on command, then trigger a click event and callback this function, if you already gived a function

## makeCommands-command Object Values
name | type | description
:--: | :--: | :------
title | string | diplay name, if set a function, will get a already dynamic created title
index | integer | index of `makeCommands Configs -> commands`
options | Object | see `makeCommands-commands Configs`

## makeCommands-tableRow Object Values
name | type | description
:--: | :--: | :------
value | mixed | the table row value
index | integer | the table row index
row | Object | the table row


Ps: 这个可能是很Lowbe的插件, 慎用
