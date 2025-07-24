module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
    const url_provider = 'https://github.com/shelllee/clash_rules/blob/main/clash_rules.yaml?raw=true'
    let { headers:{"subscription-userinfo": si = ""}={}, status, data } = await axios.get(url_provider)
    // si = si.replace(/;*$/g,'')
    if (status !== 200) {
        console.log('error ' + status)
        return raw
    }

    const yaml_value_type = {
        yaml_array: Symbol("yaml_array"),
        yaml_object: Symbol("yaml_object")
    }

    const method_type = {
        prepend: Symbol("prepend"),
        append: Symbol("append"),
        mix: Symbol("mix")
    }

    function merge(content, parser, value_type, method, key)
    {
        let parser_key = [method.description, key].join('-')

        console.log('process ' + parser_key)

        if (parser[parser_key] === undefined)
        {
            console.log('parser ' + parser_key + ' not exist')
            return
        }

        if (content[key] === undefined)
        {
            content[key] = value_type === yaml_value_type.yaml_object ? {} : value_type === yaml_value_type.yaml_array ? [] : ""
        }

        if (value_type === yaml_value_type.yaml_object)
        {
            content[key] = {...parser[parser_key], ...content[key]}
        }
        else if (value_type === yaml_value_type.yaml_array)
        {
            if (method == method_type.prepend)
            {
                content[key] = [...parser[parser_key], ...content[key]]
            }
            else //if (method == method_type.append)
            {
                content[key] = [...content[key], ...parser[parser_key]]
            }
        }
    }

    let profile = yaml.parse(raw)
    let parsers = yaml.parse(data)

    merge(profile, parsers, yaml_value_type.yaml_object, method_type.mix,     'rule-providers')
    merge(profile, parsers, yaml_value_type.yaml_array,  method_type.prepend, 'rules')

    let result = yaml.stringify(profile)

    // result = result.replace(/-\s+name/g, '- \n    name')

    // console.log(result)

    return result
}
