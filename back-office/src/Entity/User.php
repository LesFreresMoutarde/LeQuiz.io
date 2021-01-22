<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name=""user"", uniqueConstraints={@ORM\UniqueConstraint(name="user_passwordResetToken_key", columns={"passwordResetToken"}), @ORM\UniqueConstraint(name="user_username_key", columns={"username"}), @ORM\UniqueConstraint(name="user_email_key", columns={"email"})}, indexes={@ORM\Index(name="user_email", columns={"email"}), @ORM\Index(name="user_username", columns={"username"}), @ORM\Index(name="user_plan", columns={"plan"})})
 * @ORM\Entity
 */
class User
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName=""user"_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=30, nullable=false)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=191, nullable=false)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     */
    private $password;

    /**
     * @var string|null
     *
     * @ORM\Column(name="passwordResetToken", type="string", length=255, nullable=true)
     */
    private $passwordresettoken;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="lastResetPasswordEmailSendDate", type="datetimetz", nullable=true)
     */
    private $lastresetpasswordemailsenddate;

    /**
     * @var string
     *
     * @ORM\Column(name="plan", type="string", length=30, nullable=false)
     */
    private $plan;

    /**
     * @var string
     *
     * @ORM\Column(name="role", type="string", length=30, nullable=false)
     */
    private $role;

    /**
     * @var bool
     *
     * @ORM\Column(name="isTrustyWriter", type="boolean", nullable=false)
     */
    private $istrustywriter;

    /**
     * @var bool
     *
     * @ORM\Column(name="isActive", type="boolean", nullable=false)
     */
    private $isactive;

    /**
     * @var bool
     *
     * @ORM\Column(name="isBanned", type="boolean", nullable=false)
     */
    private $isbanned;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="unbanDate", type="datetimetz", nullable=true)
     */
    private $unbandate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetimetz", nullable=false)
     */
    private $createdat;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetimetz", nullable=false)
     */
    private $updatedat;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="deletedAt", type="datetimetz", nullable=true)
     */
    private $deletedat;


}
