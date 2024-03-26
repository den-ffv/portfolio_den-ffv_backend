import Contact from "../models/ContactModel";

interface ContactData {
    name: string,
    url: string
}

interface ContactServiceResponse {
    contact: ContactData;

}

class ContactService {
    isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false
        }
    }

    async create(name: string, url: string): Promise<ContactServiceResponse> {

        if (!this.isValidUrl(url)) {
            throw new Error("Invalid URL")
        }

        const queryForCreateContact = await Contact.create({
            name: name,
            url: url
        })

        return {contact: queryForCreateContact.dataValues};
    }

    async getAll() {
        const contacts = await Contact.findAll();
        const contactsData = contacts.map(contact => contact.toJSON())

        return {contacts: contactsData}
    }

    async update(id: string, name: string, url: string): Promise<ContactServiceResponse> {

        if (!this.isValidUrl(url)) {
            throw new Error("Invalid URL")
        }
        const updatedContact = await Contact.findByPk(id);
        if (!updatedContact) {
            throw new Error("Contact not found");
        }
        await updatedContact.update({name, url});

        return {contact: updatedContact.dataValues}
    }

    async delete(id: string): Promise<void> {

        const resultOfDeletingContact = await Contact.destroy({
            where: {
                id: id,
            },
        });


    }
}

export default new ContactService()