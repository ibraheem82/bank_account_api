const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('validator');
const UserAccount = require('../schema/user.account.model');

const schema = Joi.object({
  bvn: Joi.string().required(),
  phone: Joi.string().required(),
  birthYear: Joi.number().required(),
  birthMonth: Joi.number().required(),
  birthDate: Joi.number().required()
});

router.post(`/`, async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    const { bvn, phone, birthYear, birthMonth, birthDate } = value;

    const userAccount = new UserAccount({
      bvn,
      phone,
      birthYear,
      birthMonth,
      birthDate
    });

    await userAccount.save();

    // Mask the last four digits of the phone number with asterisks
    // const maskedNumber = `${bvn.toString().slice(-4)}${'*'.repeat(4)}`;
    // const maskedNumber = `${bvn.toString().slice(-4)}${'*'.repeat(4)}`;
    const bvnString = bvn.toString();
    const maskedNumber = `${bvnString.slice(0, -4)}${'*'.repeat(4)}`;

    res.status(201).json({
      success: true,
      message: 'User account created successfully',
      data: {
        bvn:maskedNumber,
        phone,
        birthYear:
        birthMonth,
        birthDate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating user account'
    });
  }
});

module.exports = router