from models import Contact
from flask import jsonify, request
from config import app, db
from sqlalchemy.exc import IntegrityError


@app.route("/contacts", methods=["GET"])
def get_contacts():
    try:
        contacts = Contact.query.all()
        json_contacts = list(map(lambda x: x.to_json(), contacts))
        return jsonify({"contacts": json_contacts})
    except Exception as e:
        return jsonify({"message": f"Error fetching contacts: {str(e)}"}), 500


@app.route("/create_contact", methods=["POST"])
def create_contact():
    try:
        data = request.json
        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")

        if not all([first_name, last_name, email]):
            return jsonify({"message": "Missing required fields"}), 400

        new_contact = Contact(first_name=first_name, last_name=last_name, email=email)

        db.session.add(new_contact)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Contact created successfully",
                    "contact": new_contact.to_json(),
                }
            ),
            201,
        )

    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Email already exists"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error creating contact: {str(e)}"}), 500


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    try:
        contact = Contact.query.get(user_id)
        if not contact:
            return jsonify({"message": "Contact not found"}), 404

        data = request.json
        contact.first_name = data.get("firstName", contact.first_name)
        contact.last_name = data.get("lastName", contact.last_name)
        contact.email = data.get("email", contact.email)

        db.session.commit()

        return jsonify(
            {"message": "Contact updated successfully", "contact": contact.to_json()}
        )

    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Email already exists"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error updating contact: {str(e)}"}), 500


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    try:
        contact = Contact.query.get(user_id)
        if not contact:
            return jsonify({"message": "Contact not found"}), 404

        db.session.delete(contact)
        db.session.commit()

        return jsonify(
            {"message": "Contact deleted successfully", "deleted_id": user_id}
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error deleting contact: {str(e)}"}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
