// ========== 海外合规情报站 - 主交互脚本 ==========

document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="search-box">
            <input type="text" placeholder="搜索法规、市场、新闻..." id="searchInput">
            <div id="searchResults" style="margin-top: 16px;"></div>
        </div>
    `;
    document.body.appendChild(searchModal);

    searchBtn?.addEventListener('click', () => {
        searchModal.classList.toggle('active');
        if (searchModal.classList.contains('active')) {
            document.getElementById('searchInput').focus();
        }
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });

    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // 切换按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 这里可以扩展加载不同标签的内容
            console.log('切换到标签:', tab);
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // 添加监控提示
    window.toggleAlert = function() {
        alert('监控功能开发中 - 将支持邮件/飞书推送最新法规更新');
    };

    // 卡片进入动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .update-item, .category-card').forEach(el => {
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
});

// ========== 数据存储结构 ==========
const ComplianceDB = {
    regions: {
        vietnam: {
            name: '越南',
            flag: '🇻🇳',
            status: 'establishing',
            keyLaws: [
                { name: '广告法 (Law on Advertising)', year: 2012, lastUpdate: '2023修订', category: '广告' },
                { name: '电子商务法 (Law on E-commerce)', year: 2005, lastUpdate: '2022修订', category: '电商' },
                { name: '消费者权益保护法', year: 2010, lastUpdate: '2023', category: '消费者' },
                { name: '劳动法 (Labor Code)', year: 2019, lastUpdate: '2023实施细则', category: '劳动' },
                { name: '外商投资法 (Law on Investment)', year: 2020, lastUpdate: '2023修订', category: '外资' },
                { name: '网络安全法 (Law on Cybersecurity)', year: 2018, lastUpdate: '2022', category: '网络' }
            ],
            agencies: [
                { name: 'Ministry of Industry and Trade (MOIT)', role: '广告、电商管理', url: 'https://moit.gov.vn' },
                { name: 'Vietnam Competition Authority (VCA)', role: '竞争执法', url: 'https://vca.gov.vn' },
                { name: 'Ministry of Labor, Invalids and Social Affairs', role: '劳动用工', url: 'https://molisa.gov.vn' },
                { name: 'Department of Planning and Investment', role: '外商投资审批', url: '' }
            ],
            influencerRules: {
                licenseRequired: true,
                adLabelRequired: true,
                taxObligations: '年收入超1亿越南盾需注册税务',
                platformLiability: '平台需对内容负连带责任',
                keyRestrictions: ['医疗广告需审批', '金融产品需持牌', '博彩禁止']
            }
        },
        thailand: {
            name: '泰国',
            flag: '🇹🇭',
            status: 'establishing',
            keyLaws: [
                { name: '贸易竞争法 (Trade Competition Act)', year: 2017, lastUpdate: '2023', category: '竞争' },
                { name: '计算机犯罪法 (Computer Crime Act)', year: 2007, lastUpdate: '2017修订', category: '网络' },
                { name: '外商经营法 (Foreign Business Act)', year: 1999, lastUpdate: '2022', category: '外资' },
                { name: '劳动保护法 (Labor Protection Act)', year: 1998, lastUpdate: '2023', category: '劳动' },
                { name: '消费者保护法 (Consumer Protection Act)', year: 1979, lastUpdate: '2023', category: '消费者' },
                { name: '个人数据保护法 (PDPA)', year: 2019, lastUpdate: '2023生效', category: '数据' }
            ],
            agencies: [
                { name: 'Office of Trade Competition Commission (OTCC)', role: '竞争法执法', url: 'https://www.otcc.go.th' },
                { name: 'Department of Business Development (DBD)', role: '公司注册', url: 'https://www.dbd.go.th' },
                { name: 'Ministry of Digital Economy and Society', role: '数字平台监管', url: 'https://mdes.go.th' },
                { name: 'Consumer Protection Board', role: '消费者保护', url: '' }
            ],
            influencerRules: {
                licenseRequired: false,
                adLabelRequired: true,
                taxObligations: '年收入超一定门槛需缴纳个人所得税',
                platformLiability: '平台需配合监管机构',
                keyRestrictions: ['酒精广告受严格限制', '王室相关内容禁止', '佛像使用受限']
            }
        },
        malaysia: {
            name: '马来西亚',
            flag: '🇲🇾',
            status: 'monitoring',
            keyLaws: [
                { name: '通信与多媒体法 (CMA)', year: 1998, lastUpdate: '2023', category: '通信' },
                { name: '个人数据保护法 (PDPA)', year: 2010, lastUpdate: '2023修订', category: '数据' },
                { name: '消费者保护法 (Consumer Protection Act)', year: 1999, lastUpdate: '2023', category: '消费者' },
                { name: '劳动法 (Employment Act)', year: 1955, lastUpdate: '2023修订', category: '劳动' },
                { name: '公司委员会法 (Companies Act)', year: 2016, lastUpdate: '2023', category: '公司' },
                { name: '1950年合同法', year: 1950, lastUpdate: '', category: '合同' }
            ],
            agencies: [
                { name: 'Malaysian Communications and Multimedia Commission', role: '数字内容监管', url: 'https://www.mcmc.gov.my' },
                { name: 'Companies Commission of Malaysia (SSM)', role: '公司注册', url: 'https://www.ssm.com.my' },
                { name: 'Advertising Standards Authority (ASA)', role: '广告自律', url: '' },
                { name: 'Personal Data Protection Department', role: '数据保护', url: '' }
            ],
            influencerRules: {
                licenseRequired: false,
                adLabelRequired: true,
                taxObligations: 'MCMC要求KOL申报商业合作',
                platformLiability: 'MCMC可对平台发指令下架内容',
                keyRestrictions: ['宗教敏感内容', '种族关系', '政治广告']
            }
        },
        hongkong: {
            name: '香港',
            flag: '🇭🇰',
            status: 'operating',
            keyLaws: [
                { name: '商品说明条例 (Trade Descriptions Ordinance)', year: 2012, lastUpdate: '2023', category: '广告' },
                { name: '个人资料隐私条例 (PDPO)', year: 1996, lastUpdate: '2023修订', category: '数据' },
                { name: '竞争条例 (Competition Ordinance)', year: 2012, lastUpdate: '2023', category: '竞争' },
                { name: '雇佣条例 (Employment Ordinance)', year: 1968, lastUpdate: '2023', category: '劳动' },
                { name: '公司条例 (Companies Ordinance)', year: 2014, lastUpdate: '2023', category: '公司' },
                { name: '广播事务管理局守则', year: 2013, lastUpdate: '', category: '广播' }
            ],
            agencies: [
                { name: 'Communications Authority (CA)', role: '广播、电视广告守则', url: 'https://www.coms-auth.hk' },
                { name: 'Competition Commission', role: '竞争执法', url: 'https://www.compcomm.hk' },
                { name: 'Office of the Privacy Commissioner for Personal Data', role: '个人数据保护', url: 'https://www.pcpd.org.hk' },
                { name: 'Customs and Excise Department', role: '商品说明条例执法', url: '' }
            ],
            influencerRules: {
                licenseRequired: false,
                adLabelRequired: true,
                taxObligations: '商业收入需申报利得税/薪俸税',
                platformLiability: '平台在香港运营需遵守本地法规',
                keyRestrictions: ['虚假商品说明', '误导性遗漏', '具威胁性的商业行为']
            }
        }
    },
    
    peers: [
        {
            name: '蓝色光标 (BlueFocus)',
            ticker: '300058.SZ',
            markets: ['中国', '东南亚'],
            disclosureUrl: '',
            keyInfo: '2023年报披露东南亚收入占比及合规投入'
        },
        {
            name: 'Yeah1 Group',
            ticker: 'YEG.VN',
            markets: ['越南', '泰国', '菲律宾'],
            disclosureUrl: '',
            keyInfo: '越南本土传媒集团，跨境扩张策略及本地化合规'
        },
        {
            name: '吹拉弹唱传媒',
            ticker: '',
            markets: ['泰国', '越南'],
            disclosureUrl: '',
            keyInfo: '出海MCN机构，东南亚达人管理'
        }
    ]
};

// 导出供其他脚本使用
window.ComplianceDB = ComplianceDB;
