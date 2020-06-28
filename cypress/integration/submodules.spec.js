context('Submodule apps are working fine', () => {
    describe('the app main page is rendering correctly', () => {
        const apps = [
            { name: 'angularjs-personal-page', title: 'Carles Capellas' },
            { name: 'bachata-science', title: 'Bachata Science' },
            { name: 'carniques-ausa', title: 'Càrniques Ausa' },
            { name: 'desdecasa', title: 'Inici - Des de Casa' },
            { name: 'do-vic', title: 'D.O. Vic | Inici' },
            { name: 'dragon-pong', title: 'Dragon Pong' },
            { name: 'exquiseaty', title: 'Home | exquiseaty' },
            { name: 'fractal-generator', title: 'Fractal generator' },
            { name: 'jokify', title: 'Jokify. Chistes random' },
            // jokify-api is tested separatedly
            { name: 'michael', title: 'Michael Page' },
            { name: 'php-personal-page', title: 'Inici' },
            { name: 'poliester-pelegrina', title: 'Poliester Germans Pelegrina' },
            { name: 'react-personal-page', title: 'Carles Capellas' },
            { name: 'responsive-do-vic', title: 'D.O. Vic' },
            // skills-matrix-api-graphql is tested separately
            // skills-matrix-api-node is tested separately
            { name: 'skills-matrix-client-jquery', title: 'Skills Matrix' },
            { name: 'skills-matrix-client-redux', title: 'Skills Matrix' },
            { name: 'skills-matrix-client-typescript', title: 'Skills Matrix' },
            { name: 'skills-matrix-client-vue', title: 'Skills Matrix' },
            { name: 'skills-matrix-client-webpack', title: 'Skills Matrix' },
            { name: 'sudoku-generator', title: 'Sudoku generator' },
            { name: 'vrokil', title: 'vrokil' },
            { name: 'vue-personal-page', title: 'Home | Carles Capellas' },
            { name: 'vue-personal-page (default app)', url: '', title: 'Home | Carles Capellas' },
            { name: 'webjack', title: 'Webjack' },
        ];

        apps.forEach(app => {
            it(app.name, () => {
                cy.request(`http://localhost/${app.url !== undefined ? app.url : app.name}`)
                    .then(response => expect(response.body).to.contain(`<title>${app.title}</title>`));
            });
        });

        it('jokify-api', () => {
            cy.request('http://localhost/jokify-api/joke/random').then(response => {
                // Any random joke string will have at least 15 characters
                expect(response.body.text.length).to.be.greaterThan(0);
            });
        });

        it('jokify deep linking', () => {
            cy.request('http://localhost/jokify/1').then(response => {
                expect(response.body).to.contain(`<p class="joke-paragraph">¿Cómo maldice un pollo a otro pollo? ¡Caldito seas!</p>`);
            });
        });

        it('skills-matrix-api-graphql', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost/skills-matrix-api-graphql',
                body: {
                    query: `{
                        employee {
                            totalCount
                        }
                    }`
                }
            }).then(response => {
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('employee');
                expect(response.body.data.employee).to.have.property('totalCount');
            });
        });

        it('skills-matrix-api-node', () => {
            cy.request('http://localhost/skills-matrix-api-node/api/skill').then(response => {
                expect(response.body).to.have.property('CurrentPage', 0);
            });
        });
    });

    describe('interactions', () => {
        it('webjack app has Play Online button', () => {
            cy.visit('http://localhost/webjack', { timeout: 5000 });
            cy.get('button.btn.btn-success').contains('Play online');
        });

        it('vue-personal-page app has blog link', () => {
            cy.request('http://localhost/')
                .then(response => expect(response.body).to.contain('<a href="/blog" class="nav-link">Blog</a>'));
        });
    });
});