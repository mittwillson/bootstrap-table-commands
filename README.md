# bootstrap-table-commands
bootstrap-table commands plugin | bootstrap-table 的 commands 插件

## LICENSE

**NOTE:** Bootstrap Table is licensed under the [The MIT License](https://github.com/MittWillson/bootstrap-table-commands/blob/master/LICENSE). Completely free, you can arbitrarily use and modify this plugin. If this plugin is useful to you, you can **Star** this repo, your support is my biggest motive force, thanks.

## example
```
<!DOCTYPE html>
<html>
<head>
    <title>Bootstrap Table Commands</title>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
    <script src="//cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>
    <script src="bootstrap-table-commands.js"></script>
</head>
<body>
<div class="container">
    <h1>Bootstrap Table Commands</h1>
    <h2>https://github.com/MittWillson/bootstrap-table-commands</h2>
    <table id="table">
    </table>
</div>
<script type="text/javascript">
    var $table = $('#table');
    $table.bootstrapTblae({
        data: [
            {
                id: 1,
                name: 'admin'
            },
            {
                id: 2,
                name: 'user'
            },
            {
                id: 3,
                name: 'guest'
            }
        ],
        columns: [
            {
                field: 'id',
                title: 'ID'
            },
            {
                field: 'name',
                title: 'Name'
            }
        ],
        makeCommands: {
            options: {
                // field: 'command',
                title: 'Commands',
                classes: ['command'], // just like `class`
            },
            commands: [
                {
                    title: 'see',
                    callback: function(event, command, tableRow)
                    {
                        console.log(event, command, tableRow);
                    }
                },
                {
                    title: 'edit',
                    callback: function(event, command, tableRow)
                    {
                        console.log(event, command, tableRow);
                    }
                },
                {
                    title: function(command, tableRow)
                    {
                        if(tableRow.row.name === 'admin')
                        {
                            return 'no access';
                        } else {
                            return 'delete';
                        }
                    },
                    callback: function(event, command, tableRow)
                    {
                        if(tableRow.row.name === 'admin')
                        {
                            alert('no access');
                        } else {
                            alert('already deleted');
                        }
                    }
                }
            ]
        }
    });
</script>
</body>
</html>
```

## makeCommands Configs

name | type | description
:--: | :--: | :-----:
options | Object | just like `table-column` config
commands | Object | for create commands

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
