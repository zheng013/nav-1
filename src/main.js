const $siteList = $('.siteList')
const $lastLi = $('li.last')

const siteData = localStorage.getItem('data')
const dataObject = JSON.parse(siteData)    //读取要变成JSON对象进行操作
const hashMap = dataObject || [{ logo: 'A', url: 'https://www.acfun.cn' }, { logo: 'B', url: 'https://www.bilibili.com' }]




const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                      <svg class="icon1">
                        <use xlink:href="#icon-close1"></use>
                          </svg>
                              </div>
                </div>
            </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.icon').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (!url) { return }
    else if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }

    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),  //最后以字符串的样式输出
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)    //存储要将其转化为字符串的样式  GlobalEventHandlers.onbeforeunload
    localStorage.setItem('data', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})