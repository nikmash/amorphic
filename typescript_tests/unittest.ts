import { expect } from 'chai';

import {Amorphic} from '../index.js';
import {Ticket} from "./apps/common/js/ticket";
import {Project} from "./apps/common/js/project";
import {Person} from "./apps/common/js/person";
import {TicketItem} from "./apps/common/js/ticketItem";

var amorphic = Amorphic.create();
amorphic.connect(__dirname, __dirname);

describe('Banking from pgsql Example', () => {

    it ('connects', function () {
        return amorphic.connect(__dirname, __dirname);
    });

    it ('can delete all tickets', () => {
        return Ticket.persistorDeleteByQuery({});
    });

    it ('can delete all projects', () => {
        return Project.persistorDeleteByQuery({});
    });

    it ('can delete all persons', () => {
        return Person.persistorDeleteByQuery({});
    });

    it ('can delete all ticketItems', () => {
        return TicketItem.persistorDeleteByQuery({});
    });

    it ('can create a ticket', () => {
        var ticket = new Ticket("My First Ticket", "This is the beginning of  something good", "Project One");
        ticket.persistorSave();
    });

    it('can read back the ticket', () => {
        Ticket.persistorFetchByQuery({})
            .then( (tickets : Array<Ticket>) => {
                expect(tickets.length).to.equal(1);
                expect(tickets[0].project.name).to.equal("Project One");
            });
    });
});