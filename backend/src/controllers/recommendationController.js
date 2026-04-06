import express from "express";
import {GoogleGenAI} from '@google/genai'

export const getRecommendations = async (req, res) => {
    const { mood, region } = req.body;

    if (!mood || !region) {
        return res.status(400).json({
            message: 'Mood and region are required'
        });
    }

    const prompt =
        `Recommend exactly 10 popular songs that match a ${mood} mood and are popular in ${region}. 
    Return ONLY a valid JSON array like this: 
    [{"title":"Song Name","artist":"Artist Name"}, ...] 
    Do not add any extra text.`;

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        })
        let text = response.text;
        text = text.replace(/```json|```/g, '').trim();

        const songs = JSON.parse(text);

        return res.json({ songs });
    } catch (error) {
        console.error("Gemini AI Error:", error.message); // Helpful for debugging

        res.status(500).json({
            message: 'AI error, please try again later'
        });
    }
}