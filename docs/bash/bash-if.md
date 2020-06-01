---
id: bash-if
title: If
---

Syntax examples

```bash
if read -p 'breakfast? [y/n] '; [[ $REPLY = y ]]; then
  echo 'Here are your eggs.';
elif [[ $REPLY = n ]]; then
  echo 'At least have a coffee';
fi

# [[ Jack = Jane ]]内部命令和中括号必须用空格隔开,等于号两边必须有空格，否则整个命令会被认为是字符串
$ [[ Jack = Jane ]] && echo "Jack is Jane" || echo "Jack is not Jane"
Jack is not Jane
$ [[Jack = Jane ]] && echo "Jack is Jane" || echo "Jack is not Jane"
-bash: [[Jack: command not found
$ [[ Jack=Jane ]] && echo "Jack is Jane" || echo "Jack is not Jane"
Jack is Jane
```
