import pool from "../pool/pool";

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

        const queryForCreateContact = await pool.query(`INSERT INTO contact(name, url, admin_id)
                                                        VALUES ($1, $2, 1) RETURNING *`, [name, url]);
        return {contact: queryForCreateContact.rows[0]};

    }

    async getAll() {
        const contacts = await pool.query(`SELECT *
                                           FROM contact`)
        return {contacts: contacts.rows}
    }

    async update(id: string, name: string, url: string): Promise<ContactServiceResponse> {

        if (!this.isValidUrl(url)) {
            throw new Error("Invalid URL")
        }
        const updateContactByID = await pool.query(`UPDATE contact
                                                    SET name = $1,
                                                        url  = $2
                                                    WHERE id = $3 RETURNING *;`, [name, url, id])

        return {contact: updateContactByID.rows[0]}
    }

    async delete(id: string): Promise<void> {
        const resultOfDeletingContact = await pool.query(`DELETE
                                                          FROM contact
                                                          WHERE id = $1`, [id]);

    }
}

export default new ContactService()