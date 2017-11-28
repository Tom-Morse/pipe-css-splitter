var postcss = require('postcss');

const extractDecl = (rule, names) => {
    let _decs = [];
    names.forEach((declName) => {
        rule.walkDecls(declName, (decl) => {
            _decs.push(decl);
            decl.remove();
        });
    });
    return _decs;
};

const handleContext = (selector, options, postcssOptions) => {
    let _selector = new RegExp(`(${selector}\\s{1})`, 'g');
    let _rule = null, _declarations;
    if (postcssOptions.originRule.selector.indexOf(selector) === 0) {
        _rule = postcssOptions.originRule.clone();
        _rule.removeAll();
        _declarations = extractDecl(postcssOptions.originRule, options.extract);
        postcssOptions.originRule.selector = postcssOptions.originRule.selector.replace(_selector, '');
        _declarations.map((declaration) => { _rule.append(declaration); });
    }
    return _rule;
};

module.exports = postcss.plugin('pipe-css-splitter', (options) => {
    options = Object.assign({}, { listenFor: [], extract: [] }, options || {});
    const _rules = [];
    return (root) => {
        options.listenFor.forEach((selector) => {
            root.walkRules((originRule) => {
                let _rule = handleContext(selector, options, { originRule, root });
                if (_rule) { _rules.push(_rule); }
            });
        });
        _rules.forEach(_rule => { root.append(_rule); });
    };
});
