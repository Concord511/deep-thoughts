import React, { useState } from 'react';
import { ADD_REACTION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const ReactionForm = ({ thoughtId }) => {
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
        setBody(event.target.value);
        setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thought to database
            await addReaction({
                variables: { thoughtId, reactionBody }
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <p className="m-0">
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch">
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    value={reactionBody}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit" onClick={handleFormSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReactionForm;