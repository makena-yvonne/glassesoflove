/**
 * Loads posts from data/news.json and renders the news listing.
 * Requires a static server or hosting (fetch may not work from file://).
 */
(function () {
  var listEl = document.getElementById('news-list');
  var errorEl = document.getElementById('news-error');
  var emptyEl = document.getElementById('news-empty');
  var loadingEl = document.getElementById('news-loading');
  var filterGroup = document.getElementById('news-filters');

  if (!listEl) return;

  var posts = [];
  var activeFilter = 'all';

  var categoryLabels = {
    project: 'Project',
    blog: 'Blog',
    update: 'Update'
  };

  function formatDate(iso) {
    try {
      var d = new Date(iso + 'T12:00:00');
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return iso;
    }
  }

  function postUrl(slug) {
    return 'news/' + encodeURIComponent(slug) + '.html';
  }

  function renderCards() {
    listEl.innerHTML = '';
    var filtered =
      activeFilter === 'all'
        ? posts
        : posts.filter(function (p) {
            return p.category === activeFilter;
          });

    if (filtered.length === 0) {
      if (emptyEl) {
        emptyEl.hidden = false;
        emptyEl.textContent =
          posts.length === 0
            ? 'No posts published yet. Add entries to data/news.json.'
            : 'No posts in this category.';
      }
      return;
    }
    if (emptyEl) emptyEl.hidden = true;

    filtered.forEach(function (post) {
      var cat = post.category || 'update';
      var label = categoryLabels[cat] || cat;
      var article = document.createElement('article');
      article.className = 'news-card';
      article.setAttribute('data-category', cat);

      var inner = document.createElement('a');
      inner.className = 'news-card-link';
      inner.href = postUrl(post.slug);

      if (post.image) {
        var thumbWrap = document.createElement('div');
        thumbWrap.className = 'news-card-thumb-wrap';
        var thumb = document.createElement('img');
        thumb.className = 'news-card-thumb';
        thumb.src = post.image;
        thumb.alt = post.title ? String(post.title) : '';
        thumb.loading = 'lazy';
        thumb.decoding = 'async';
        thumbWrap.appendChild(thumb);
        inner.appendChild(thumbWrap);
      }

      var badge = document.createElement('span');
      badge.className = 'news-category news-category--' + cat;
      badge.textContent = label;

      var date = document.createElement('time');
      date.className = 'news-card-date';
      date.dateTime = post.date;
      date.textContent = formatDate(post.date);

      var title = document.createElement('h2');
      title.className = 'news-card-title';
      title.textContent = post.title;

      var excerpt = document.createElement('p');
      excerpt.className = 'news-card-excerpt';
      excerpt.textContent = post.excerpt || '';

      var cta = document.createElement('span');
      cta.className = 'news-card-cta';
      cta.setAttribute('aria-hidden', 'true');
      cta.textContent = 'Read more';

      inner.appendChild(badge);
      inner.appendChild(date);
      inner.appendChild(title);
      inner.appendChild(excerpt);
      inner.appendChild(cta);

      article.appendChild(inner);
      listEl.appendChild(article);
    });
  }

  function setFilter(filter) {
    activeFilter = filter;
    if (filterGroup) {
      filterGroup.querySelectorAll('.news-filter').forEach(function (btn) {
        var isActive = btn.getAttribute('data-filter') === filter;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }
    renderCards();
  }

  if (filterGroup) {
    filterGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('.news-filter');
      if (!btn || !filterGroup.contains(btn)) return;
      var f = btn.getAttribute('data-filter');
      if (f) setFilter(f);
    });
  }

  var jsonUrl = new URL('data/news.json', window.location.href).href;

  fetch(jsonUrl)
    .then(function (r) {
      if (!r.ok) throw new Error('Bad response');
      return r.json();
    })
    .then(function (data) {
      if (loadingEl) loadingEl.hidden = true;
      posts = (data.posts || []).slice().sort(function (a, b) {
        return (b.date || '').localeCompare(a.date || '');
      });
      if (errorEl) errorEl.hidden = true;
      if (posts.length === 0 && emptyEl) {
        emptyEl.hidden = false;
        emptyEl.textContent =
          'No posts published yet. Add entries to data/news.json.';
      }
      setFilter(activeFilter);
    })
    .catch(function () {
      if (loadingEl) loadingEl.hidden = true;
      if (errorEl) errorEl.hidden = false;
      if (emptyEl) emptyEl.hidden = true;
    });
})();
