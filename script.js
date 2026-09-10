(function () {
  "use strict";

  /* ---------- Mobile sidebar toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");

  function openNav() {
    sidebar.classList.add("is-open");
    scrim.classList.add("is-visible");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }

    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    sidebar.classList.remove("is-open");
    scrim.classList.remove("is-visible");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }

    document.body.style.overflow = "";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = sidebar.classList.contains("is-open");
      isOpen ? closeNav() : openNav();
    });
  }

  if (scrim) {
    scrim.addEventListener("click", closeNav);
  }

  var navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });


  /* ---------- Scroll-spy active section ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll(".section[id]")
  );

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");

            navLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.dataset.section === id
              );
            });
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }


  /* ---------- Gallery Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    lightboxImg.alt = alt || "";

    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("is-open");

    if (lightboxImg) {
      lightboxImg.src = "";
    }

    document.body.style.overflow = "";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });


  /* ---------- Load Data Directly From Supabase ---------- */

  async function loadPublicData() {
    try {

      /* ---------- 1. Site Content ---------- */
      const {
        data: content,
        error: contentError
      } = await supabaseClient
        .from("site_content")
        .select("*")
        .eq("id", 1)
        .single();

      if (contentError) {
        console.error("Site content error:", contentError);
      }

      if (content) {
        var c = content;

        if (document.getElementById("heroEyebrow")) {
          document.getElementById("heroEyebrow").textContent =
            c.heroEyebrow || "";
        }

        if (document.getElementById("heroTitle")) {
          document.getElementById("heroTitle").textContent =
            c.heroTitle || "";
        }

        if (document.getElementById("heroSubtitle")) {
          document.getElementById("heroSubtitle").textContent =
            c.heroSubtitle || "";
        }

        if (document.getElementById("aboutTitle")) {
          document.getElementById("aboutTitle").textContent =
            c.aboutTitle || "";
        }

        if (document.getElementById("aboutLead")) {
          document.getElementById("aboutLead").textContent =
            c.aboutLead || "";
        }


        /* ---------- WhatsApp ---------- */

        var waNumber = c.whatsapp || "03243249829";

        var waLink =
          c.whatsappLink ||
          "https://wa.me/923243249829";

        var defaultWaMessageLink =
          waLink +
          "?text=" +
          encodeURIComponent(
            "Hi NetWatchShop, I'd like to ask about your products."
          );

        [
          "heroWhatsappBtn",
          "sidebarWhatsappLink",
          "contactWhatsappCard",
          "footerWhatsapp"
        ].forEach(function (id) {

          var el = document.getElementById(id);

          if (el) {
            el.href = defaultWaMessageLink;
          }

        });


        if (document.getElementById("contactWhatsappDisplay")) {
          document.getElementById(
            "contactWhatsappDisplay"
          ).textContent = waNumber;
        }


        /* ---------- Instagram ---------- */

        if (c.instagramLink) {

          [
            "sidebarInstagramLink",
            "contactInstagramCard",
            "footerInstagram"
          ].forEach(function (id) {

            var el = document.getElementById(id);

            if (el) {
              el.href = c.instagramLink;
            }

          });
        }

        if (
          c.instagram &&
          document.getElementById("contactInstagramDisplay")
        ) {
          document.getElementById(
            "contactInstagramDisplay"
          ).textContent = "@" + c.instagram;
        }


        /* ---------- TikTok ---------- */

        if (c.tiktokLink) {

          [
            "sidebarTiktokLink",
            "contactTiktokCard",
            "footerTiktok"
          ].forEach(function (id) {

            var el = document.getElementById(id);

            if (el) {
              el.href = c.tiktokLink;
            }

          });
        }

        if (
          c.tiktok &&
          document.getElementById("contactTiktokDisplay")
        ) {
          document.getElementById(
            "contactTiktokDisplay"
          ).textContent = "@" + c.tiktok;
        }


        /* ---------- YouTube ---------- */

        if (c.youtubeLink) {

          [
            "sidebarYoutubeLink",
            "contactYoutubeCard",
            "footerYoutube"
          ].forEach(function (id) {

            var el = document.getElementById(id);

            if (el) {
              el.href = c.youtubeLink;
            }

          });
        }

        if (
          c.youtube &&
          document.getElementById("contactYoutubeDisplay")
        ) {
          document.getElementById(
            "contactYoutubeDisplay"
          ).textContent = c.youtube;
        }
      }


      /* ---------- 2. Video ---------- */

      const {
        data: video,
        error: videoError
      } = await supabaseClient
        .from("video")
        .select("*")
        .eq("id", 1)
        .single();

      if (videoError) {
        console.error("Video error:", videoError);
      }

      if (video) {

        var v = video;

        if (document.getElementById("videoEyebrow")) {
          document.getElementById("videoEyebrow").textContent =
            v.eyebrow || "Product in action";
        }

        if (document.getElementById("videoTitle")) {
          document.getElementById("videoTitle").textContent =
            v.title || "See it in action";
        }

        var videoPlayer =
          document.getElementById("mainVideoPlayer");

        var videoSource =
          document.getElementById("videoSource");

        if (
          videoPlayer &&
          videoSource &&
          v.url
        ) {

          if (v.poster) {
            videoPlayer.poster = v.poster;
          }

          videoSource.src = v.url;

          videoPlayer.load();
        }
      }


      /* ---------- 3. Products ---------- */

      const {
        data: products,
        error: productsError
      } = await supabaseClient
        .from("products")
        .select("*")
        .eq("visible", true)
        .order("created_at", {
          ascending: false
        });

      if (productsError) {
        console.error("Products error:", productsError);
      }

      if (products) {

        renderProducts(
          products,
          content && content.whatsappLink
            ? content.whatsappLink
            : "https://wa.me/923243249829"
        );

      }


      /* ---------- 4. Gallery ---------- */

      const {
        data: gallery,
        error: galleryError
      } = await supabaseClient
        .from("gallery")
        .select("*")
        .order("created_at", {
          ascending: true
        });

      if (galleryError) {
        console.error("Gallery error:", galleryError);
      }

      if (gallery) {
        renderGallery(gallery);
      }


      /* ---------- 5. Videos (separate Videos section) ---------- */

      const {
        data: videos,
        error: videosError
      } = await supabaseClient
        .from("videos")
        .select("*")
        .order("created_at", {
          ascending: false
        });

      if (videosError) {
        console.error("Videos error:", videosError);
      }

      renderVideosSection(videos || []);

    } catch (err) {

      console.error(
        "Error loading public site data:",
        err
      );

    }
  }


  /* ---------- Pricing helpers ---------- */

  function computePricing(p) {
    var regular = null;
    var discount = null;

    if (
      p.regular_price !== undefined &&
      p.regular_price !== null &&
      String(p.regular_price).trim() !== ""
    ) {
      regular = parseFloat(p.regular_price);
    } else if (
      p.price !== undefined &&
      p.price !== null &&
      String(p.price).trim() !== ""
    ) {
      regular = parseFloat(p.price);
    }

    if (
      p.discount_price !== undefined &&
      p.discount_price !== null &&
      String(p.discount_price).trim() !== ""
    ) {
      discount = parseFloat(p.discount_price);
    }

    var hasDiscount =
      regular !== null &&
      !isNaN(regular) &&
      discount !== null &&
      !isNaN(discount) &&
      discount > 0 &&
      discount < regular;

    var percent = null;

    if (hasDiscount) {
      if (
        p.discount_percentage !== undefined &&
        p.discount_percentage !== null &&
        String(p.discount_percentage).trim() !== "" &&
        !isNaN(parseFloat(p.discount_percentage))
      ) {
        percent = Math.round(parseFloat(p.discount_percentage));
      } else {
        percent = Math.round(((regular - discount) / regular) * 100);
      }
    }

    return {
      regular: regular,
      discount: discount,
      hasDiscount: hasDiscount,
      percent: percent
    };
  }

  function formatRs(num) {
    return "Rs " + num.toLocaleString();
  }

  /* ---------- Specifications helpers ---------- */

  function parseSpecs(raw) {
    if (!raw) return [];

    var text = String(raw).trim();

    if (!text) return [];

    var parts;

    if (text.indexOf("\n") !== -1) {
      parts = text.split("\n");
    } else if (text.indexOf("·") !== -1) {
      parts = text.split("·");
    } else if (text.indexOf("|") !== -1) {
      parts = text.split("|");
    } else if (text.indexOf(",") !== -1) {
      parts = text.split(",");
    } else {
      parts = [text];
    }

    return parts
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  /* ---------- Video embed helper (YouTube, direct files, TikTok/other links) ---------- */

  function getYoutubeId(url) {
    if (!url) return null;

    var match = String(url).match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    return match && match[1] ? match[1] : null;
  }

  function isDirectVideoFile(url) {
    return /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?(#.*)?$/i.test(String(url).trim());
  }

  function buildVideoEmbedHtml(url, extraClass) {
    if (!url || !String(url).trim()) return "";

    var trimmed = String(url).trim();
    var ytId = getYoutubeId(trimmed);
    var wrapperClass = extraClass || "";

    /* YouTube — plays right inside the page */
    if (ytId) {
      return (
        '<div class="' + wrapperClass + ' product-card__video-embed">' +
        '<iframe src="https://www.youtube.com/embed/' + ytId + '" ' +
        'title="Product video" loading="lazy" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen></iframe>' +
        "</div>"
      );
    }

    /* Direct video file (.mp4/.webm/etc) — plays right inside the page */
    if (isDirectVideoFile(trimmed)) {
      return (
        '<div class="' + wrapperClass + '">' +
        '<video controls playsinline preload="metadata" src="' + escapeHtml(trimmed) + '"></video>' +
        "</div>"
      );
    }

    /* Anything else (TikTok, Instagram, Facebook, or any other video page link)
       can't be safely embedded, so show a clickable button that opens the
       video in a new tab instead. */
    return (
      '<div class="' + wrapperClass + ' product-card__video-link-wrap">' +
      '<a class="product-card__video-link" href="' + escapeHtml(trimmed) + '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
      'Watch Product Video' +
      "</a>" +
      "</div>"
    );
  }

  /* ---------- Render Products ---------- */

  function renderProducts(products, baseWaLink) {

    var container =
      document.getElementById("productGrid");

    if (!container) return;

    if (products.length === 0) {

      container.innerHTML =
        '<p class="no-products">No products available at the moment. Check back soon!</p>';

      return;
    }


    var html = products
      .map(function (p, idx) {

        var pricing = computePricing(p);

        var priceHtml;

        if (pricing.regular === null || isNaN(pricing.regular)) {
          priceHtml =
            '<span class="product-card__price product-card__price--ask">Ask for price</span>';
        } else if (pricing.hasDiscount) {
          priceHtml =
            '<div class="product-card__pricing">' +
            '<div class="product-card__price-row">' +
            '<span class="product-card__price-original">' + escapeHtml(formatRs(pricing.regular)) + '</span>' +
            '<span class="product-card__discount-badge">' + pricing.percent + '% OFF</span>' +
            '</div>' +
            '<span class="product-card__price">' + escapeHtml(formatRs(pricing.discount)) + '</span>' +
            '</div>';
        } else {
          priceHtml =
            '<span class="product-card__price">' + escapeHtml(formatRs(pricing.regular)) + '</span>';
        }


        var waMsg =
          "Hi, I'm interested in the " +
          p.name +
          ".";

        var waUrl =
          baseWaLink +
          "?text=" +
          encodeURIComponent(waMsg);


        var isInStock =
          p.inStock !== false && p.in_stock !== false;


        var stockBadge = isInStock
          ? '<span class="stock-badge stock-badge--in">In Stock</span>'
          : '<span class="stock-badge stock-badge--out">Out of Stock</span>';


        var imageSrc =
          p.image ||
          "assets/images/camera-product-shot.jpg";


        var specItems = parseSpecs(p.specifications);

        var specsHtml = "";

        if (specItems.length > 0) {
          var specPanelId = "specs-panel-" + (p.id || idx);

          specsHtml =
            '<div class="product-card__specs">' +
            '<button type="button" class="product-card__specs-toggle" aria-expanded="false" aria-controls="' + specPanelId + '">' +
            '<span>Specifications</span>' +
            '<svg class="chev" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
            '<div class="product-card__specs-panel" id="' + specPanelId + '">' +
            '<div class="product-card__specs-panel-inner">' +
            '<ul class="product-card__specs-list">' +
            specItems.map(function (item) {
              return "<li>" + escapeHtml(item) + "</li>";
            }).join("") +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';
        }


        var productVideoHtml = "";

        if (p.product_video_url && String(p.product_video_url).trim()) {
          productVideoHtml = buildVideoEmbedHtml(
            p.product_video_url,
            "product-card__video"
          );
        }


        return [
          '<article class="product-card">',

          '  <div class="product-card__media">',

          "    " +
          stockBadge,

          '    <img src="' +
          escapeHtml(imageSrc) +
          '" alt="' +
          escapeHtml(p.name) +
          '" loading="lazy">',

          "  </div>",

          '  <div class="product-card__body">',

          "    <h3>" +
          escapeHtml(p.name) +
          "</h3>",

          p.description
            ? '    <p class="product-card__desc">' +
            escapeHtml(p.description) +
            "</p>"
            : "",

          "    " + specsHtml,

          "    " + productVideoHtml,

          '    <div class="product-card__foot">',

          "      " +
          priceHtml,

          '      <a class="btn btn--whatsapp btn--sm" href="' +
          escapeHtml(waUrl) +
          '" target="_blank" rel="noopener">',

          '        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">',
          '          <path d="M12.02 2C6.5 2 2.03 6.46 2.03 11.98c0 1.87.5 3.62 1.44 5.13L2 22l5.03-1.42a9.9 9.9 0 0 0 4.98 1.34h.01c5.53 0 10-4.46 10-9.98C22.02 6.46 17.55 2 12.02 2Zm5.87 14.19c-.25.7-1.44 1.35-1.98 1.4-.5.05-1.05.24-3.6-.85-3.05-1.3-4.98-4.44-5.13-4.65-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.05-2.52.27-.3.6-.37.8-.37h.57c.19 0 .43-.03.66.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.32.39-.45.52-.15.15-.31.31-.13.62.18.31.79 1.32 1.7 2.15 1.17 1.06 2.15 1.4 2.46 1.55.32.15.5.13.68-.07.19-.2.8-.92 1.02-1.24.21-.31.42-.26.7-.16.28.1 1.78.85 2.09 1 .3.16.5.23.58.36.08.14.08.79-.17 1.49Z"/>',
          "        </svg>",

          "        " +
          (isInStock
            ? "Contact on WhatsApp"
            : "Inquire on WhatsApp"),

          "      </a>",

          "    </div>",

          "  </div>",

          "</article>"

        ].join("\n");

      })
      .join("\n");


    container.innerHTML = html;


    /* Attach specification toggle handlers */

    container
      .querySelectorAll(".product-card__specs-toggle")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          var expanded = btn.getAttribute("aria-expanded") === "true";
          var panel = document.getElementById(btn.getAttribute("aria-controls"));

          btn.setAttribute("aria-expanded", expanded ? "false" : "true");

          if (panel) {
            panel.classList.toggle("is-open", !expanded);
          }
        });
      });
  }


  /* ---------- Render Videos Section ---------- */

  function renderVideosSection(videos) {

    var container =
      document.getElementById("videosGrid");

    if (!container) return;

    if (!videos || videos.length === 0) {
      container.innerHTML =
        '<p class="no-videos">No extra videos have been added yet. Check back soon!</p>';

      return;
    }

    var html = videos
      .map(function (v) {

        var mediaHtml;

        if (v.video_url && String(v.video_url).trim()) {
          var ytId = getYoutubeId(v.video_url);

          if (ytId) {
            mediaHtml = buildVideoEmbedHtml(v.video_url, "");
          } else if (isDirectVideoFile(v.video_url)) {
            mediaHtml =
              '<video controls playsinline preload="metadata"' +
              (v.thumbnail_url ? ' poster="' + escapeHtml(v.thumbnail_url) + '"' : '') +
              ' src="' + escapeHtml(v.video_url) + '"></video>';
          } else {
            mediaHtml =
              (v.thumbnail_url
                ? '<img src="' + escapeHtml(v.thumbnail_url) + '" alt="' + escapeHtml(v.title || "Video thumbnail") + '">'
                : "") +
              buildVideoEmbedHtml(v.video_url, "video-card__watch-link");
          }
        } else {
          mediaHtml = "";
        }

        return [
          '<article class="video-card">',
          '  <div class="video-card__media">',
          "    " + mediaHtml,
          "  </div>",
          '  <div class="video-card__body">',
          "    <h3>" + escapeHtml(v.title || "Untitled video") + "</h3>",
          v.description
            ? "    <p>" + escapeHtml(v.description) + "</p>"
            : "",
          "  </div>",
          "</article>"
        ].join("\n");

      })
      .join("\n");

    container.innerHTML = html;
  }


  /* ---------- Render Gallery ---------- */

  function renderGallery(galleryItems) {

    var container =
      document.getElementById("galleryGrid");

    if (!container) return;


    if (galleryItems.length === 0) {

      container.innerHTML =
        '<p class="no-gallery">No gallery images available.</p>';

      return;
    }


    var html = galleryItems
      .map(function (g) {

        var spanClass =
          g.span
            ? " " + g.span
            : "";


        return [

          '<button class="gallery-item' +
          spanClass +
          '" data-full="' +
          escapeHtml(g.image) +
          '">',

          '  <img src="' +
          escapeHtml(g.image) +
          '" alt="' +
          escapeHtml(
            g.caption ||
            "NetWatchShop gallery image"
          ) +
          '" loading="lazy">',

          "</button>"

        ].join("\n");

      })
      .join("\n");


    container.innerHTML = html;


    /* Attach click handlers */

    var items =
      container.querySelectorAll(
        ".gallery-item"
      );


    items.forEach(function (item) {

      item.addEventListener(
        "click",
        function () {

          var img =
            item.querySelector("img");

          openLightbox(
            item.dataset.full,
            img
              ? img.alt
              : ""
          );

        }
      );

    });

  }


  /* ---------- Escape HTML ---------- */

  function escapeHtml(str) {

    if (!str) return "";

    return String(str)

      .replace(/&/g, "&amp;")

      .replace(/</g, "&lt;")

      .replace(/>/g, "&gt;")

      .replace(/"/g, "&quot;")

      .replace(/'/g, "&#039;");

  }


  /* ---------- Load Data ---------- */

  loadPublicData();

})();