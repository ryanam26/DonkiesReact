import React from "react";

export default props => (
    <div className="card faq-block">
        <h1>FAQ</h1>
        <h2>How does the app work?</h2>
        <p>
            Upon registration you will be prompted to input your primary bank
            account through a secure process. This should be the account you use
            most frequently. We will start to monitor your everyday purchases
            and round up each transaction to the nearest dollar. For Example, a
            $2.45 transaction will get rounded up to $3.00. We will
            automatically save the .55c in a secure account with our banking
            partners. We will only debit your account on multiples of $5. This
            means that every time your accumulated change reaches $5 we will go
            ahead and debit your account for $5 and move it into your CoinStash
            savings account.
        </p>
        <h2>How does the refund work?</h2>
        <p>
            By clicking the refund button on your dashboard we will refund all
            funds in your CoinStash account to the bank account you signed up
            with. The funds should arrive in 2-3 business days.
        </p>
        <h2>How secure is the app?</h2>
        <p>
            Security is the number one concern at CoinStash and we take it very
            seriously. We use the same security features as many of the leading
            personal finance applications on the market. We do not store any of
            your information in our systems; we use bank level encryption to
            securely send information to our partners, including your bank
            credentials.
        </p>
        <h2>How much does it cost?</h2>
        <p>
            To use the app as a saving tool it will be free, we are building
            additional features and will make sure to tell you about it as soon
            as we roll it out.
        </p>
        <h2>How much can I expect to save using this approach?</h2>
        <p>
            This all depends on your spending habits - but it is surprising how
            quickly your monthly roundups/spare change can add up to. On
            average, you can expect your monthly roundups/spare change to
            accumulate to $25 - $45, or approximately $300 - $540 per year.
        </p>
        <h2>What Account can I link?</h2>
        <p>
            As of right now you can link your primary checking account (the one
            you use most often). If you use a credit card and it is attached to
            the same bank as your primary checking account that will work too.
            If your primary account is a credit card and your checking account
            is with a different bank, unfortunately this will not work - we are
            working to add this feature.
        </p>
        <hr />
        <h1>Support</h1>
        <p>
            If you need any assistance please do not hesitate to contact us at {" "}
            <a href="mailto:support@getcoinstash.com">
                support@getcoinstash.com
            </a>
        </p>
    </div>
);
