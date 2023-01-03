module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
    const url_provider = 'https://github.com/shelllee/clash_rules/blob/main/clash_rules.yaml?raw=true'
    let { headers:{"subscription-userinfo": si = ""}={}, status, data } = await axios.get(url_provider)
    // si = si.replace(/;*$/g,'')
    if (status !== 200) {
        console.log('error ' + status)
        return raw
    }

    let content = yaml.parse(raw)
    let parser = yaml.parse(data)

    let content_key = 'rule-providers'
    let parser_key = 'mix-' + content_key

    if (parser[parser_key] !== undefined)
    {
        content[content_key] = parser[parser_key]
    }

    content_key = 'rules'
    parser_key = 'prepend-' + content_key

    if (parser[parser_key] !== undefined)
    {
        if (content[content_key] === undefined)
        {
            content[content_key] = []
        }

        content[content_key] = parser[parser_key].concat(content[content_key])
    }

    let result = yaml.stringify(content)

    console.log(result)

    return result
}
