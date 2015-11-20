// aux
function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

hexo.extend.filter.register('before_post_render', function (data) {
  data.config = this.config;
  data.config.author.age = calcAge(this.config.author.birthday);
  return data;
});


hexo.extend.helper.register('url_for_lang', function(path){
  var lang = this.page.lang;
  var url = this.url_for(path);
  var defaultLang = Array.isArray(this.config.language)
    ? this.config.language[0]
    : this.config.language;

  if (lang !== defaultLang && url[0] === '/') url = '/' + lang + url;

  return url;
});

hexo.extend.helper.register('classify_path', function(path){
  var classify = /\/blog\//.test(path) ? 'blog ' : '';

  // TODO fix is_current to accept any language
  // define path
  path = this.is_home() || this.is_current('en/', true)
    ? 'home'
    : this._.isString(path) ?
      path
      : this.path || this.page.path;

  path = path.toLowerCase().replace(/^\/?([^\/]+\/)*([^\/]+)\/[^\/]+\.html$/g, '$2');

  classify += this._.kebabCase(path);

  return classify;
});
