<?php

/** @var mixed $layoutPart */

use PrivateApi\Email\EmailContentBuilder;

// TODO replace images URLs

?>

<?php
if ($layoutPart === EmailContentBuilder::LAYOUT_PART_BEFORE_CONTENT) {
?>
<style>
    .lequiz-button:hover a {
        background-color: red !important;
        border-color: red !important;
    }
</style>

<div style="background-color: #23C5EF; background-image: url('https://i.ibb.co/RQ0qzZ6/lequizio-bg.png'); background-repeat: repeat; margin: 0; padding: 0; width: 100%; color: #ffffff; font-family: Lato, 'helvetica neue', helvetica, arial, sans-serif; font-size: 17px;">
    <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border-spacing: 0px; padding: 0; margin: 0; width: 100%; height: 100%;">
        <tbody>
        <tr style="border-collapse: collapse">
            <td valign="top" style="padding:0;Margin:0">
                <table cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%">
                    <tbody>
                    <tr style="border-collapse: collapse">
                        <td align="center" style="padding: 0; margin: 0">
                            <table style="border-collapse: collapse; border-spacing: 0px; width: 600px;" width="600" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                <tr style="border-collapse: collapse">
                                    <td style="margin: 0; padding: 0;">
                                        <?php // MAIN TD WITH ALL CONTENT : HEADER, MAIN CONTENT AND FOOTER ?>
                                        <table style="border-collapse: collapse; border-spacing: 0px; width: 100%" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                            <tr>
                                                <td align="center" style="margin: 0; padding: 0; text-align: center; padding-top: 30px; padding-bottom: 15px;">
                                                    <img src="https://i.ibb.co/wsWZbcM/le-Quizlogo.png" width="150" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <?php // IMPORTANT : NO MARGIN ON TABLE WHICH HAVE THE BACKGROUND (buggy on some clients) ?>
                                        <table style="background-color: #ffffff; color: #333; border-radius: 5px; border-collapse: separate; border-spacing: 0px; width: 100%" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                            <tr style="border-collapse: collapse">
                                                <td style="margin: 0; padding-top: 20px; padding-bottom: 20px; padding-left: 20px; padding-right: 20px;">
<?php
}

if ($layoutPart === EmailContentBuilder::LAYOUT_PART_AFTER_CONTENT) {
?>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table style="border-collapse: collapse; border-spacing: 0px; width: 100%" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                            <tr style="border-collapse: collapse">
                                                <td style="margin: 0; padding-top: 20px; padding-bottom: 20px; padding-left: 0; padding-right: 0;">
<?php
}

if ($layoutPart === EmailContentBuilder::LAYOUT_PART_AFTER_FOOTER) {
?>

                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<?php
}

?>
