/**
    commands Maker
    made by Mitt
    2017-05-26
**/

(function ($) {
    'use strict';
    var defaultOptions = {
        title: 'Commands',
        events: {},
        classes: []
    };
    var defaultCommand = {
        title: null,
        classes: [],

        callback: null
    };

    var commandsMakerDefaults = {
        options: defaultOptions,
        commands: [],
        defaultTemplate: function (command, tableRow) {
            // command = { title, index, options }
            // tableRow = { value, index, row }
            var $template = $('<span></span>').attr('class', 'command_maker');
            var classes = command.options.classes;
            classes.push('command_event');
            var $templateA = $template.append(
                $('<a></a>')
                    .attr('class', classes.join(' '))
                    .attr('href', 'javascript:void(0)')
                    .text($.isFunction(command.title) ? command.title(command, tableRow) : command.title)
                    .attr('data-command-id', command.index)
            );
            if(command.index < this.commands.length - 1)
            {
                $template.append('&nbsp;|&nbsp;');
            }
            return $templateA.prop('outerHTML');
        },
        disable: false
    };

    $.extend($.fn.bootstrapTable.defaults, {
        makeCommands: commandsMakerDefaults
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable,
        _initBody = BootstrapTable.prototype.initBody;

    BootstrapTable.prototype.initTable = function () {
        var _this = this;
        if(!this.options.makeCommands.disable && this.options.makeCommands.commands.length > 0)
        {
            $.each(this.options.makeCommands.commands, function (index, command) {
                _this.options.makeCommands.commands[index] = $.extend({}, defaultCommand, command);
            });

            this.options.makeCommands = $.extend({}, commandsMakerDefaults, this.options.makeCommands);
            this.options.makeCommands.options = $.extend({}, defaultOptions, this.options.makeCommands.options);

            if($.isEmptyObject(this.options.makeCommands.options.class))
            {
                this.options.makeCommands.options.class = this.options.makeCommands.options.classes;
            } else {
                if(typeof this.options.makeCommands.options.class === 'string')
                {
                    this.options.makeCommands.options.class = this.options.makeCommands.options.class.split(/\s+/);
                }

                if(typeof this.options.makeCommands.options.classes === 'string')
                {
                    this.options.makeCommands.options.classes = this.options.makeCommands.options.classes.split(/\s+/);
                }

                // little plugin
                // use classes to replace class
                $.merge(this.options.makeCommands.options.class, this.options.makeCommands.options.classes);
                // delete useless attribute
                delete this.options.makeCommands.options.classes;
            }

            this.options.makeCommands.options.class = this.options.makeCommands.options.class.join(' ');

            var options = $.extend({}, this.options.makeCommands.options, {
                formatter: function (value, row, index) {
                    var result = '';

                    if($.isFunction(_this.options.makeCommands.options.formatter))
                    {
                        result = _this.options.makeCommands.options.formatter.apply(this, Array.prototype.slice.apply(arguments));
                        if( result === null || result === undefined )
                        {
                            result = '';
                        }
                    }

                    $.each(_this.options.makeCommands.commands, function (each_index, command) {
                        result += _this.options.makeCommands.defaultTemplate({
                            title: command.title,
                            index: each_index,
                            options: command
                        }, {
                            value: value,
                            index: index,
                            row: row
                        });
                    });

                    return result;
                },
                events: $.extend({}, this.options.makeCommands.options.events, {
                    'click .command_maker .command_event': function (event, value, row, index) {
                        var id = $(event.target).data('command-id');

                        if(id === null)
                        {
                            return ;
                        }

                        if(_this.options.makeCommands.commands.length > id)
                        {
                            if($.isFunction(_this.options.makeCommands.commands[id].callback))
                            {
                                _this.options.makeCommands.commands[id].callback(event, {
                                    index: id,
                                    options: _this.options.makeCommands.commands[id]
                                }, {
                                    index: index,
                                    value: value,
                                    row: row
                                });
                            }
                        }
                    }
                })
            });
            this.options.columns.push(options);
        } else {
            this.options.makeCommands.disable = true;
        }
        _initTable.apply(this, Array.prototype.slice.apply(arguments));
    };

    BootstrapTable.initBody = function () {
        var _this = this;

        if(!this.options.makeCommands.disable)
        {
        }

        _initBody.apply(this, Array.prototype.slice.apply(arguments));
    };
})(jQuery);