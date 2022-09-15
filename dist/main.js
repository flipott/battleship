(() => {
  'use strict';
  const t = (t, e, o) => {
      const r = o,
        n = [];
      return {
        name: t,
        coords: e,
        length: r,
        hitArray: n,
        sunk: !1,
        hit: (t) => {
          for (let e = 0; e < n.length; e += 1)
            if (n[e][0] === t[0] && n[e][1] === t[1]) return !1;
          return n.push(t);
        },
        isSunk: () => n.length === r,
      };
    },
    e = (e, o) => {
      const r = e,
        n = o,
        s = ((e) => {
          const o = e,
            r = [],
            n = [],
            s = [];
          for (let t = 9; t >= 0; t -= 1)
            for (let e = 0; e < 10; e += 1)
              r.push({ x: e, y: t, empty: !0, occupiedBy: null });
          const u = (t, e) => {
              for (let o = 0; o < r.length; o += 1)
                if (r[o].x == t && r[o].y == e) return r[o];
              return !1;
            },
            c = (t) => {
              for (let e = 0; e < n.length; e += 1)
                if (n[e].name === t) return n[e];
              return !1;
            },
            a = (t) => {
              for (let e = 0; e < t.coords.length; e += 1) {
                const o = t.coords[e][0],
                  r = t.coords[e][1];
                (u(o, r).empty = !1), (u(o, r).occupiedBy = t.name);
              }
              n.push(t);
            };
          function p() {
            let t = null;
            for (let e = 0; e < r.length; e += 1) {
              let e = Math.floor(10 * Math.random()),
                o = Math.floor(10 * Math.random());
              if (u(e, o).empty) {
                t = [e, o];
                break;
              }
              (e = Math.floor(10 * Math.random())),
                (o = Math.floor(10 * Math.random()));
            }
            return t;
          }
          function l(t, e) {
            const o = [],
              r = t[0],
              n = t[1];
            if (
              u(r, n).empty &&
              u(r + 1, n).empty &&
              u(r + 2, n).empty &&
              u(r + 3, n).empty &&
              u(r + 4, n).empty
            ) {
              const t = [];
              t.push([r, n]),
                t.push([r + 1, n]),
                t.push([r + 2, n]),
                t.push([r + 3, n]),
                t.push([r + 4, n]),
                o.push(t);
            }
            if (
              u(r, n).empty &&
              u(r - 1, n).empty &&
              u(r - 2, n).empty &&
              u(r - 3, n).empty &&
              u(r - 4, n).empty
            ) {
              const t = [];
              t.push([r, n]),
                t.push([r - 1, n]),
                t.push([r - 2, n]),
                t.push([r - 3, n]),
                t.push([r - 4, n]),
                o.push(t);
            }
            if (
              u(r, n).empty &&
              u(r, n + 1).empty &&
              u(r, n + 2).empty &&
              u(r, n + 3).empty &&
              u(r, n + 4).empty
            ) {
              const t = [];
              t.push([r, n]),
                t.push([r, n + 1]),
                t.push([r, n + 2]),
                t.push([r, n + 3]),
                t.push([r, n + 4]),
                o.push(t);
            }
            if (
              u(r, n).empty &&
              u(r, n - 1).empty &&
              u(r, n - 2).empty &&
              u(r, n - 3).empty &&
              u(r, n - 4).empty
            ) {
              const t = [];
              t.push([r, n]),
                t.push([r, n - 1]),
                t.push([r, n - 2]),
                t.push([r, n - 3]),
                t.push([r, n - 4]),
                o.push(t);
            }
            let s = o[Math.floor(Math.random() * o.length)];
            return s ? ((s = s.slice(0, e)), s) : l(p(), e);
          }
          return {
            owner: o,
            board: r,
            getSpace: u,
            generateFleet: () => {
              const e = l(p(), 5),
                o = t('carrier', e, 5);
              a(o);
              const r = l(p(), 4),
                n = t('battleship', r, 4);
              a(n);
              const s = l(p(), 3),
                u = t('destroyer', s, 3);
              a(u);
              const c = l(p(), 3),
                i = t('submarine', c, 3);
              a(i);
              const h = l(p(), 2),
                m = t('patrol', h, 2);
              a(m);
            },
            receiveAttack: (t, e) => {
              if ((console.log(u(t, e)), u(t, e).empty))
                (u(t, e).occupiedBy = 'missed'),
                  (u(t, e).empty = !1),
                  s.push([t, e]);
              else {
                if (u(t, e).empty || 'missed' === u(t, e).occupiedBy) return !1;
                {
                  console.log('WHAT', u(t, e));
                  const o = u(t, e).occupiedBy;
                  console.log('HIT SHIP:', o),
                    c(o).hit([t, e]),
                    console.log(c(o).hitArray),
                    c(o).isSunk() && (c(o).sunk = !0),
                    console.log(c(o).sunk);
                }
              }
            },
            ships: n,
            allSunk: () =>
              !!(n[0].sunk && n[1].sunk && n[2].sunk && n[3].sunk && n[4].sunk),
          };
        })(r),
        u = [];
      return {
        name: r,
        type: n,
        board: s,
        receiveAttack: function (t, e) {
          try {
            s.receiveAttack(t, e);
          } catch (t) {
            console.log(t);
          }
        },
        sendRandomAttack: function () {
          let t = null;
          function e(t, e) {
            let o = !0;
            for (let r = 0; r < u.length; r += 1)
              u[r][0] === t && u[r][1] === e && (o = !1);
            return o;
          }
          for (let o = 0; o < 100; o += 1) {
            let o = Math.floor(10 * Math.random()),
              r = Math.floor(10 * Math.random());
            if (e(o, r)) {
              (t = [o, r]), u.push(t);
              break;
            }
            (o = Math.floor(10 * Math.random())),
              (r = Math.floor(10 * Math.random()));
          }
          return t;
        },
        sentAttacks: u,
      };
    },
    o = document.querySelector('.player-board'),
    r = document.querySelector('.cpu-board'),
    n = (t, e) => {
      if ('human' === e) {
        o.innerHTML = '';
        for (let e = 0; e < t.length; e += 1) {
          const r = document.createElement('div');
          (r.className = 'space'),
            r.setAttribute('x', t[e].x),
            r.setAttribute('y', t[e].y),
            r.setAttribute('occupiedBy', t[e].occupiedBy),
            r.setAttribute('empty', t[e].empty),
            o.appendChild(r);
        }
      } else if ('cpu' === e) {
        console.log('YEP'), (r.innerHTML = '');
        for (let e = 0; e < t.length; e += 1) {
          const o = document.createElement('div');
          (o.className = 'space'),
            o.setAttribute('x', t[e].x),
            o.setAttribute('y', t[e].y),
            'missed' === t[e].occupiedBy
              ? o.setAttribute('occupiedBy', 'missed')
              : 'hit' === t[e].occupiedBy &&
                o.setAttribute('occupiedBy', 'hit'),
            o.setAttribute('empty', null),
            r.appendChild(o);
        }
      }
    },
    s = e('CPU', 'cpu');
  s.board.generateFleet();
  const u = e('Player', 'human');
  u.board.generateFleet(), n(u.board.board, u.type), n(s.board.board, s.type);
  let c = document.getElementsByClassName('space');
  function a(t, e) {
    console.log(`${t} ${e}`),
      s.receiveAttack(t, e),
      n(s.board.board, s.type),
      (c = document.getElementsByClassName('space'));
    for (let t = 0; t < 100; t += 1)
      c[t].addEventListener('click', (t) => {
        a(
          parseInt(t.target.getAttribute('x')),
          parseInt(t.target.getAttribute('y'))
        );
      });
  }
  for (let t = 0; t < 100; t += 1)
    c[t].addEventListener('click', (t) => {
      a(
        parseInt(t.target.getAttribute('x')),
        parseInt(t.target.getAttribute('y'))
      );
    });
})();
