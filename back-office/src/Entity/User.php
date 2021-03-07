<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * User
 *
 * @ORM\Table(
 *     name="`user`",
 *     uniqueConstraints={
 *     @ORM\UniqueConstraint(name="user_passwordResetToken_key", columns={"passwordResetToken"}),
 *     @ORM\UniqueConstraint(name="user_username_key", columns={"username"}),
 *     @ORM\UniqueConstraint(name="user_email_key", columns={"email"})},
 *     indexes={
 *     @ORM\Index(name="user_email", columns={"email"}),
 *     @ORM\Index(name="user_username", columns={"username"}),
 *     @ORM\Index(name="user_plan", columns={"plan"})})
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity("username", message="{{ value }} is already used")
 * @UniqueEntity("email", message="{{ value }} is already used")
 * @ORM\HasLifecycleCallbacks
 */
class User extends EntityBase implements UserInterface
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\SequenceGenerator(sequenceName="user_id_seq", allocationSize=1, initialValue=1)
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
     * @Assert\Email(message="{{ value }} is not a valid email")
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     * @Assert\Length(min=8)
     */
    private $password;

    /**
     * @var string|null
     *
     * @ORM\Column(name="`passwordResetToken`", type="string", length=255, nullable=true)
     */
    private $passwordResetToken;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="`lastResetPasswordEmailSendDate`", type="datetimetz", nullable=true)
     */
    private $lastResetPasswordEmailSendDate;

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
     * @ORM\Column(name="`isTrustyWriter`", type="boolean", nullable=false)
     */
    private $isTrustyWriter;

    /**
     * @var bool
     *
     * @ORM\Column(name="`isActive`", type="boolean", nullable=false)
     */
    private $isActive;

    /**
     * @var bool
     *
     * @ORM\Column(name="`isBanned`", type="boolean", nullable=false)
     */
    private $isBanned;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="`unbanDate`", type="datetimetz", nullable=true)
     */
    private $unbanDate;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="`deletedAt`", type="datetimetz", nullable=true)
     */
    private $deletedAt;

    /**
     * @var CustomQuiz[]
     *
     * @ORM\OneToMany(targetEntity="CustomQuiz", mappedBy="author")
     */
    private $customQuizzes;

    /**
     * @var Subscription[]
     *
     * @ORM\OneToMany(targetEntity="Subscription", mappedBy="user")
     */
    private $subscriptions;

    /**
     * @var UserReview[]
     *
     * @ORM\OneToMany(targetEntity="UserReview", mappedBy="reviewer")
     */
    private $reviews;


    public function __construct()
    {
        $this->customQuizzes = new ArrayCollection();
        $this->subscriptions = new ArrayCollection();
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPasswordResetToken(): ?string
    {
        return $this->passwordResetToken;
    }

    public function setPasswordResetToken(?string $passwordResetToken): self
    {
        $this->passwordResetToken = $passwordResetToken;

        return $this;
    }

    public function getLastResetPasswordEmailSendDate(): ?\DateTimeInterface
    {
        return $this->lastResetPasswordEmailSendDate;
    }

    public function setLastResetPasswordEmailSendDate(?\DateTimeInterface $lastResetPasswordEmailSendDate): self
    {
        $this->lastResetPasswordEmailSendDate = $lastResetPasswordEmailSendDate;

        return $this;
    }

    public function getPlan(): ?string
    {
        return $this->plan;
    }

    public function setPlan(string $plan): self
    {
        $this->plan = $plan;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getIsTrustyWriter(): ?bool
    {
        return $this->isTrustyWriter;
    }

    public function setIsTrustyWriter(bool $isTrustyWriter): self
    {
        $this->isTrustyWriter = $isTrustyWriter;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getIsBanned(): ?bool
    {
        return $this->isBanned;
    }

    public function setIsBanned(bool $isBanned): self
    {
        $this->isBanned = $isBanned;

        return $this;
    }

    public function getUnbanDate(): ?\DateTimeInterface
    {
        return $this->unbanDate;
    }

    public function setUnbanDate(?\DateTimeInterface $unbanDate): self
    {
        $this->unbanDate = $unbanDate;

        return $this;
    }

    public function getDeletedAt(): ?\DateTimeInterface
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTimeInterface $deletedAt): self
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    /**
     * @return Collection|CustomQuiz[]
     */
    public function getCustomQuizzes(): Collection
    {
        return $this->customQuizzes;
    }

    public function addCustomQuiz(CustomQuiz $customQuiz): self
    {
        if (!$this->customQuizzes->contains($customQuiz)) {
            $this->customQuizzes[] = $customQuiz;
            $customQuiz->setAuthor($this);
        }

        return $this;
    }

    public function removeCustomQuiz(CustomQuiz $customQuiz): self
    {
        if ($this->customQuizzes->removeElement($customQuiz)) {
            // set the owning side to null (unless already changed)
            if ($customQuiz->getAuthor() === $this) {
                $customQuiz->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Subscription[]
     */
    public function getSubscriptions(): Collection
    {
        return $this->subscriptions;
    }

    public function addSubscription(Subscription $subscription): self
    {
        if (!$this->subscriptions->contains($subscription)) {
            $this->subscriptions[] = $subscription;
            $subscription->setUser($this);
        }

        return $this;
    }

    public function removeSubscription(Subscription $subscription): self
    {
        if ($this->subscriptions->removeElement($subscription)) {
            // set the owning side to null (unless already changed)
            if ($subscription->getUser() === $this) {
                $subscription->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserReview[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(UserReview $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setReviewer($this);
        }

        return $this;
    }

    public function removeReview(UserReview $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getReviewer() === $this) {
                $review->setReviewer(null);
            }
        }

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function getRoles()
    {
        return ['ROLE_'.strtoupper($this->role)];
    }

    /**
     * @inheritDoc
     */
    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }
}
