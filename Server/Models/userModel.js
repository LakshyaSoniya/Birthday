const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
    },
    selfName: {
        type: String,
    },
    audioUrl: {
        type: String,
    },
    audioPublicId: {
        type: String,
    },
    Home : {
        title : {
            type: String,
        },
        subtitle : {
            type: String,
        },
        message : {
            type: String,
        }
    },
    memoryImages: [{
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
        caption: {
            type: String,
        },
        subtitle: {
            type: String,
        }
    }],
    memories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Memory'
    }],
    letter : {
        title: {
            type: String,
        },
        greeting: {
            type: String,
        },
        body: [{
            type: String,
        }],
        specialMessage: {
            type: String,
        },
        signature: {
            type: String,
        },
        signatureName: {
            type: String,
        }
    }
})

UserSchema.methods.genToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {expiresIn: '30d'});
}
UserSchema.methods.comparePassword = async function (enteredPassword) {
    // return await bcrypt.compare(enteredPassword, this.password);
    return enteredPassword === this.password;
}
UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;