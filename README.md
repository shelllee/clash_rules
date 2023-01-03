- `https://github.com/shelllee/clash_rules/blob/main/clash_rules.yaml?raw=true`
- `https://raw.githubusercontent.com/shelllee/clash_rules/main/clash_rules.yaml`
- `https://cdn.jsdelivr.net/gh/shelllee/clash_rules@main/clash_rules.yaml`

- `https://github.com/shelllee/clash_rules/blob/main/clash_rules_parsers.js?raw=true`
- `https://raw.githubusercontent.com/shelllee/clash_rules/main/clash_rules_parsers.js`
- `https://cdn.jsdelivr.net/gh/shelllee/clash_rules@main/clash_rules_parsers.js`

- `https://github.com/shelllee/clash_rules/blob/main/clash_rules_parsers.yaml?raw=true`
- `https://raw.githubusercontent.com/shelllee/clash_rules/main/clash_rules_parsers.yaml`
- `https://cdn.jsdelivr.net/gh/shelllee/clash_rules@main/clash_rules_parsers.yaml`

```
parsers: # array
  - reg: https://s.trojanflare.+$
    remote:
      url: https://github.com/shelllee/clash_rules/blob/main/clash_rules_parsers.js?raw=true
      cache: false
```
