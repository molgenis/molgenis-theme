import archy from 'archy'
import chalk from 'chalk'
import path from 'path'
import tildify from 'tildify'

export const __dirname = path.dirname(new URL(import.meta.url).pathname)

const format = {
    selected: (options, selected) => {
        let styledOptions = options.map((option) => {
            if (option === selected) return chalk.blue(option)
            else return chalk.grey(option)
        })
        return `${chalk.grey('[')}${styledOptions.join(chalk.grey('|'))}${chalk.grey(']')}`
    },
}


export const buildInfo = async function(cli) {
    const tree = {
        label: chalk.bold('config'),
        nodes: [
            {
                label: chalk.bold('build'),
                nodes: [
                    {label: `${'optimize'.padEnd(15, ' ')} ${cli.settings.optimize}`},
                ]
            },
            {
                label: chalk.bold('dir'),
                nodes: Object.entries(cli.settings.dir).map(([k, dir]) => {
                    return {label: `${k.padEnd(15, ' ')} ${tildify(dir)}`}
                })
            },
            {
                label: chalk.bold('env'),
                nodes: [
                    {label: `${'MG_PROXY'.padEnd(15, ' ')} ${cli.settings.MG_PROXY}`},
                    {label: `${'MG_PROXY_THEMEGEN'.padEnd(15, ' ')} ${cli.settings.MG_PROXY_THEMEGEN}`},
                    {label: `${'MG_THEME'.padEnd(15, ' ')} ${cli.settings.MG_THEME}`}
                ]
            }
        ]
    }
    cli.log('\r')
    archy(tree).split('\r').forEach((line) => cli.log(line))
}

