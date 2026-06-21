/* =========================================================
   STEPHANIE MAKEUP ARTIST — Site Script
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Year in footer ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Instagram / TikTok links wiring ---------- */
  const igUrl = `https://instagram.com/${SITE_CONFIG.instagram}`;
  const ttUrl = `https://tiktok.com/@${SITE_CONFIG.tiktok}`;

  const igFloat = document.getElementById("igFloat");
  if (igFloat) igFloat.href = igUrl;

  const shopIgBtn = document.getElementById("shopIgBtn");
  if (shopIgBtn) shopIgBtn.href = igUrl;

  const igLink = document.getElementById("igLink");
  if (igLink) igLink.href = igUrl;

  const ttLink = document.getElementById("ttLink");
  if (ttLink) ttLink.href = ttUrl;

  /* ---------- Contact form -> Instagram ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // No hay envío automático de datos (por privacidad no se usa WhatsApp/email).
      // Se dirige a la persona a enviar el mensaje directamente por Instagram.
      window.open(igUrl, "_blank", "noopener");
    });
  }

  /* ---------- Nav scroll state + mobile toggle ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }


 /* ---------- Testimonios (carrusel) ----------
     Para agregar una alumna nueva: copia un objeto y pégalo donde
     quieras que aparezca en el orden del carrusel. Campos:
     - name: nombre de la alumna/clienta
     - mode: "Presencial" o "Virtual" (o el texto que prefieras, ej. "Evento infantil")
     - text: el comentario/reseña
     - social: opcional. { platform: "Instagram" | "TikTok", user: "usuario_sin_arroba" }
       Si no tiene redes, simplemente omite "social" o ponla en null.
  ------------------------------------------------------------- */
  const TESTIMONIALS = [
    { name: "María José Torres", mode: "Evento infantil",
      text: "El face painting que hizo para el cumpleaños de mi hija fue espectacular, los niños quedaron fascinados con los diseños.",
      social: null },
    { name: "Anthony Paucar", mode: "Producción artística",
      text: "Contraté maquillaje artístico para una producción fotográfica y el resultado fue exactamente el concepto que buscábamos.",
      social: null },
    { name: "Andrea Pullas", mode: "Virtual · Caracterización con Prótesis ",
      text: "Tomé la clase de caracterización con prótesis de forma virtual y la explicación fue clarísima, paso a paso.",
      social: null },
    { name: "Evelyn Tarapués", mode: "Presencial · Face Painting",
      text: "Excelente clase presencial, Stephanie explica con mucha paciencia y los diseños que practicamos quedaron increíbles. La recomiendo totalmente.",
      social: null },
    { name: "Anita Ordóñez", mode: "Presencial · Face Painting",
      text: "Aprendí muchísimo en la clase presencial, desde la mezcla de colores hasta los acabados. Superó mis expectativas.",
      social: null },
    { name: "Karen Guerrero", mode: "Presencial · Face Painting",
      text: "Una experiencia súper completa, se nota la trayectoria y el profesionalismo de Stephanie en cada técnica que enseña.",
      social: null },
    { name: "Valeria Sarmiento", mode: "Presencial · Face Painting",
      text: "Me encantó el ambiente de la clase y lo clara que es explicando cada paso. Salí con mucha más confianza para practicar.",
      social: null },
    { name: "Carolina Guallpa", mode: "Presencial · Face Painting",
      text: "100% recomendada. La clase presencial fue dinámica y aprendí técnicas que no había visto en ningún otro lado.",
      social: null },
    { name: "Johana Chuquimarca", mode: "Presencial · Face Painting",
      text: "Stephanie tiene una manera de enseñar muy clara y cercana. Quedé feliz con los resultados de mis primeros diseños.",
      social: null },
    { name: "Laura Cárdenas", mode: "Presencial · Face Painting",
      text: "La pasé increíble aprendiendo, resolvió todas mis dudas y el nivel de detalle que maneja es impresionante.",
      social: null },
    { name: "Dorothy Pérez", mode: "Presencial · Face Painting",
      text: "Una de las mejores clases que he tomado, muy bien organizada y con materiales profesionales para practicar.",
      social: null },
    { name: "Domenique Salguero", mode: "Presencial · Face Painting",
      text: "Aprendí desde cero y ahora me siento segura haciendo mis propios diseños. Totalmente recomendada.",
      social: null },
    { name: "Paula Calahorrano", mode: "Presencial · Face Painting",
      text: "Excelente metodología y mucha paciencia para explicar. Vale muchísimo la pena tomar la clase con ella.",
      social: null },
    { name: "Noelia Junco", mode: "Virtual · Face Painting",
      text: "La clase virtual fue clarísima, pude seguir cada paso desde casa sin ningún problema. Muy recomendada.",
      social: null },
    { name: "Pamela Salazar", mode: "Virtual · Face Painting",
      text: "Excelente experiencia de aprendizaje online, Stephanie está siempre pendiente de resolver dudas durante la clase.",
      social: null },
  ];
 
  const testiTrack = document.getElementById("testiTrack");
  const testiDotsWrap = document.getElementById("testiDots");
  const testiPrevBtn = document.getElementById("testiPrev");
  const testiNextBtn = document.getElementById("testiNext");
 
  if (testiTrack) {
    TESTIMONIALS.forEach((t) => {
      const card = document.createElement("div");
      card.className = "testi-card";
      const initial = t.name.trim().charAt(0).toUpperCase();
      const socialHtml = t.social
        ? `<a class="testi-social" href="https://${t.social.platform === "TikTok" ? "tiktok.com/@" : "instagram.com/"}${t.social.user}" target="_blank" rel="noopener">@${t.social.user} · ${t.social.platform}</a>`
        : `<span>${t.mode}</span>`;
      card.innerHTML = `
        <p class="testi-text">${t.text}</p>
        <div class="testi-who">
          <span class="testi-avatar">${initial}</span>
          <span><strong>${t.name}</strong>${socialHtml}</span>
        </div>`;
      testiTrack.appendChild(card);
    });
 
    /* Loop infinito: clonamos las primeras y últimas `perView` tarjetas
       en los extremos opuestos del track. Así, al llegar a un clon,
       saltamos sin transición a la tarjeta real equivalente y el
       movimiento se siente continuo en ambas direcciones. */
    let perView = window.innerWidth <= 880 ? 1 : 3;
    const total = TESTIMONIALS.length;
    const realCards = () => [...testiTrack.querySelectorAll(".testi-card")];
 
    function buildClones() {
      // limpia clones previos
      testiTrack.querySelectorAll(".testi-card.is-clone").forEach((el) => el.remove());
      const cards = realCards();
      const headClones = cards.slice(0, perView).map((c) => {
        const clone = c.cloneNode(true);
        clone.classList.add("is-clone");
        return clone;
      });
      const tailClones = cards.slice(-perView).map((c) => {
        const clone = c.cloneNode(true);
        clone.classList.add("is-clone");
        return clone;
      });
      tailClones.forEach((c) => testiTrack.insertBefore(c, testiTrack.firstChild));
      headClones.forEach((c) => testiTrack.appendChild(c));
    }
 
    // testiIndex empieza en `perView` porque antes de las tarjetas reales
    // hay `perView` clones de cola (las últimas tarjetas repetidas al inicio)
    let testiIndex = perView;
    let isAnimating = false;
 
    function renderDots() {
      testiDotsWrap.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const dot = document.createElement("button");
        dot.className = "testi-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Ir al testimonio ${i + 1}`);
        dot.addEventListener("click", () => goTo(i + perView));
        testiDotsWrap.appendChild(dot);
      }
    }
 
    function cardMetrics() {
      const card = testiTrack.children[0];
      if (!card) return { width: 0, gap: 24 };
      const width = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(testiTrack).gap) || 24;
      return { width, gap };
    }
 
    function setTransform(withTransition) {
      const { width, gap } = cardMetrics();
      testiTrack.style.transition = withTransition ? "transform .5s cubic-bezier(.22,1,.36,1)" : "none";
      testiTrack.style.transform = `translateX(-${testiIndex * (width + gap)}px)`;
    }
 
    function updateDots() {
      const realIndex = ((testiIndex - perView) % total + total) % total;
      [...testiDotsWrap.children].forEach((d, i) =>
        d.classList.toggle("is-active", i === realIndex)
      );
    }
 
    function goTo(targetIndex) {
      if (isAnimating) return;
      isAnimating = true;
      testiIndex = targetIndex;
      setTransform(true);
      updateDots();
    }
 
    // Cuando termina la transición, si quedamos sobre un clon,
    // saltamos sin animación a la posición real equivalente.
    testiTrack.addEventListener("transitionend", () => {
      isAnimating = false;
      if (testiIndex >= total + perView) {
        testiIndex = testiIndex - total;
        setTransform(false);
      } else if (testiIndex < perView) {
        testiIndex = testiIndex + total;
        setTransform(false);
      }
    });
 
    testiPrevBtn.addEventListener("click", () => goTo(testiIndex - 1));
    testiNextBtn.addEventListener("click", () => goTo(testiIndex + 1));
 
    window.addEventListener("resize", () => {
      const newPerView = window.innerWidth <= 880 ? 1 : 3;
      if (newPerView !== perView) {
        perView = newPerView;
        buildClones();
        testiIndex = perView;
        setTransform(false);
        renderDots();
        updateDots();
      } else {
        setTransform(false);
      }
    });
 
    buildClones();
    renderDots();
    setTransform(false);
  }

  /* ---------- Portfolio gallery ---------- */
  const portfolioItems = [
    { cat: "caracterizacion", tall: true, title: "Caracterización de personaje", tag: "Caracterización",
      img: "assets/placeholders/portfolio-caracterizacion-1.png" },
    { cat: "fantasia", tall: false, title: "Maquillaje de fantasía", tag: "Fantasía",
      img: "assets/placeholders/portfolio-fantasia-1.png" },
    { cat: "facepaint", tall: false, title: "Face painting infantil", tag: "Face Painting",
      img: "assets/placeholders/portfolio-facepaint-1.png" },
    { cat: "protesis", tall: false, title: "Prótesis foam flex", tag: "Prótesis & FX",
      img: "assets/placeholders/portfolio-protesis-1.png" },
    { cat: "fantasia", tall: true, title: "Body painting artístico", tag: "Fantasía",
      img: "assets/placeholders/portfolio-fantasia-2.png" },
    { cat: "caracterizacion", tall: false, title: "Personaje con efectos especiales", tag: "Caracterización",
      img: "assets/placeholders/portfolio-caracterizacion-2.png" },
    { cat: "facepaint", tall: false, title: "Diseño de face painting avanzado", tag: "Face Painting",
      img: "assets/placeholders/portfolio-facepaint-2.png" },
    { cat: "protesis", tall: false, title: "Aerografía de alta precisión", tag: "Prótesis & FX",
      img: "assets/placeholders/portfolio-protesis-2.png" },
  ];

  const gallery = document.getElementById("gallery");
  function renderGallery(filter) {
    gallery.innerHTML = "";
    portfolioItems
      .filter((item) => filter === "all" || item.cat === filter)
      .forEach((item) => {
        const el = document.createElement("div");
        el.className = `gallery-item${item.tall ? " gallery-item--tall" : ""}`;
        el.innerHTML = `
          <img src="${item.img}" alt="${item.title}" loading="lazy">
          <div class="gallery-caption">
            <strong>${item.title}</strong>
            <span>${item.tag}</span>
          </div>`;
        el.addEventListener("click", () => openLightbox(item.img, item.title));
        gallery.appendChild(el);
      });
  }
  renderGallery("all");

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGallery(btn.dataset.filter);
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("is-open");
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

 /* ---------- Kits (solo para alumnas de la academia) ---------- */
  const products = [
    { name: "Paleta Grande One Stroke", cat: "Color & Teoría", price: "Bajo consulta", badge: null,
      desc: "12 splits de alta pigmentación para dominar la técnica One Stroke y mezclas en degradado.",
      img: "assets/store/paleta-large.png" },
    { name: "Paleta Mediana One Stroke", cat: "Color & Teoría", price: "Bajo consulta", badge: null,
      desc: "8 splits compactos, ideal para empezar a practicar transiciones de color sin sobrecargar el kit.",
      img: "assets/store/paleta-medium.png" },
    { name: "Paleta en Crema Aquacolor", cat: "Body & Face Art", price: "Bajo consulta", badge: null,
      desc: "22 splits de textura cremosa, con gran cobertura y resistencia para piezas grandes de cuerpo y rostro.",
      img: "assets/store/paleta-crema.png" },
    { name: "Paleta de Colores Neón", cat: "Body & Face Art", price: "Bajo consulta", badge: null,
      desc: "8 pigmentos fluorescentes que brillan bajo luz UV, perfectos para looks de fantasía y fiestas con luz negra.",
      img: "assets/store/paleta-neon.png" },
    { name: "Set de Pinceles", cat: "Herramientas", price: "Bajo consulta", badge: null,
      desc: "Selección de pinceles de distintos grosores para líneas finas, sombreados y detalles de precisión.",
      img: "assets/store/kit-brochas.png" },
    { name: "Stencils", cat: "Accesorios", price: "Bajo consulta", badge: null,
      desc: "Plantillas reutilizables que agilizan diseños simétricos y repetitivos en pintura facial.",
      img: "assets/store/kit-stencils.png" },
    { name: "Set de Esponjas", cat: "Herramientas", price: "Bajo consulta", badge: null,
      desc: "Esponjas de pétalos de alta densidad para esfuminados uniformes y bases de color parejas.",
      img: "assets/store/kit-esponjas.png" },
    { name: "Pelucas", cat: "Caracterización", price: "Bajo consulta", badge: "Novedad",
      desc: "Modelos con flequillo largo y liso en varios colores, fáciles de colocar y combinar con cualquier personaje.",
      img: "assets/store/kit-pelucas.png" },
  ];

  const shopGrid = document.getElementById("shopGrid");
  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-body">
        <span class="product-cat">${p.cat}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <a class="product-buy" href="${igUrl}" target="_blank" rel="noopener" aria-label="Consultar ${p.name} por Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.7 0 3 0 4.1.06 1.1.05 1.8.22 2.4.46a4.9 4.9 0 0 1 1.8 1.16 4.9 4.9 0 0 1 1.16 1.78c.24.62.41 1.32.46 2.42C21.98 9 22 9.3 22 12s0 3-.06 4.1c-.05 1.1-.22 1.8-.46 2.42a4.9 4.9 0 0 1-1.16 1.8 4.9 4.9 0 0 1-1.8 1.16c-.6.24-1.3.41-2.4.46C15 21.98 14.7 22 12 22s-3 0-4.1-.06c-1.1-.05-1.8-.22-2.42-.46a4.9 4.9 0 0 1-1.78-1.16 4.9 4.9 0 0 1-1.16-1.8c-.24-.6-.41-1.3-.46-2.4C2.02 15 2 14.7 2 12s0-3 .06-4.1c.05-1.1.22-1.8.46-2.42A4.9 4.9 0 0 1 3.68 3.7a4.9 4.9 0 0 1 1.8-1.16c.6-.24 1.3-.41 2.4-.46C9 2.02 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.4 6.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>
          </a>
        </div>
      </div>`;
    shopGrid.appendChild(card);
  });

});
