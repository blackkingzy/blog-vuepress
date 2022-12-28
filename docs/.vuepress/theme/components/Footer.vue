<template>
    <div class="footer_contain">
        <div class="footer_content">
            <div>
                &nbsp;© CopyRight 2021
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有 www.blackyue.com
            </div>
            <div>
                <span class="police"></span>
                <a
                    target="_blank"
                    href="https://beian.miit.gov.cn/"
                >
                    蒙ICP备20001860号 京公网安备21021102000825号</a
                >
            </div>
            <div>
                <ul class="icon-list">
                    <li>
                        <a
                            class="github"
                            target="_blank"
                            href="https://www.blackyue.com/2021/03/18/why/#_5、源码地址"
                        ></a>
                    </li>
                    <li>
                        <a
                            class="wechat"
                            target="_blank"
                            href="https://www.blackyue.com/2021/03/18/why/#_6、微信二维码"
                        ></a>
                    </li>
                    <li>
                        <a
                            class="qq"
                            target="_blank"
                            href="https://www.blackyue.com/2021/03/18/why/#_6、微信二维码"
                        ></a>
                    </li>
                    <li class="site_details">
                        <a
                            class="Info"
                            target="_blank"
                            href="https://www.blackyue.com/2021/03/18/why/#_6、微信二维码"
                        ></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@media (min-width: 768px) {
    .footer_contain {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon-list li.note_mobile {
        display: none;
    }
}

@media (max-width: 768px) {
    .icon-list li.note_pc {
        display: none;
    }
}

.footer_contain {
    font-size: 0.8rem;
    height: 100%;
    color: #909090;
}


.icon-list {
    list-style: none;
    margin: 0;
    padding: 0;
    vertical-align: text-bottom;
}

.icon-list li {
    margin-right: 2px;
    display: inline-block;
}

.icon-list li a {
    width: 28px;
    height: 28px;
    display: inline-block;
    background-image: url('../assets/icon.svg');
    background-repeat: no-repeat;
    vertical-align: middle;
}

.wechat {
    background-position: -140px;
}

.qq {
    background-position: -56px;
}

.Note {
    background-image: url('../assets/note.svg') !important;
    background-position: center;
}

.Info {
    background-image: url('../assets/info.svg') !important;
    background-size: cover;
}

.QRcode {
    width: 150px;
    height: 150px;
}

.police {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    background-image: url('../assets/police.svg');
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: text-bottom;
}
</style>
