/// <reference types="cypress" />


describe('Игра в пары', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('input').type('4');
        cy.contains('Начать игру').click();
        cy.get('ul li').should('have.length', 16)
    });

    it('Открытие произвольной карты', () => {
        cy.contains('1')
            .parent('li') // находим родителя, который является элементом li
            .click();
        // Проверка, что карточка осталась открытой (имеет класс area-item-transform)
        cy.contains('1')
            .parent('li') 
            .should('have.class', 'area-item-transform');
    });

    it('Поиск и проверка пары первой карточки', () => {
        let firstCard = '';
        let secondCard = '';
        let foundMatch = false;

        cy.get('li')
            .first()
            .as('firstCard') // Добавляем алиас для первой карточки
            .wait(500)
            .click()
            .get('@firstCard') // Используем алиас для продолжения работы с первой карточкой
            .children('div.back')
            .invoke('text')
            .then((text) => {
                firstCard = text;
            })
            .then(() => {
                cy.get('li:not(.area-item-transform)')
                    .each(($arrayItem) => {
                        cy.get('@firstCard') // Используем алиас для продолжения работы с первой карточкой
                            .click()
                            .then(() => {
                                if (foundMatch) {
                                    return false; // Останавливаем цикл после нахождения пары
                                }
                                cy.wrap($arrayItem)
                                    .wait(500)
                                    .click()
                                    .children('div.back')
                                    .invoke('text')
                                    .then((text) => {
                                        secondCard = text;
                                        if (firstCard === secondCard) {
                                            expect(firstCard).equal(secondCard);
                                            foundMatch = true;
                                        }
                                    });
                            });
                    })
            });
    });

    it('Поиск пар у карточке по порядку', () => {

    });

})