# picidae-transformer-mark

Transform markdown syntax `==mark==` to `<mark>mark</mark>`

**NOTE:**  
`==~~mark~~==` will transform to `<mark>~~mark~~</mark>`  
`~~==mark==~~` will transform to `<del><mark>mark</mark></del>`  
`==\=escape==` will transform to `<mark>=escape</mark>`