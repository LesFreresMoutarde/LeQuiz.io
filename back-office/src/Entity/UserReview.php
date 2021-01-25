<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserReview
 *
 * @ORM\Table(
 *     name="user_review",
 *     indexes={
 *     @ORM\Index(name="user_review_reviewer_id", columns={"reviewerId"}),
 *     @ORM\Index(name="user_review_custom_quiz_id", columns={"customQuizId"}),
 *     @ORM\Index(name="user_review_status", columns={"status"})})
 * @ORM\Entity(repositoryClass="App\Repository\UserReviewRepository")
 * @ORM\HasLifecycleCallbacks
 */
class UserReview extends EntityBase
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\SequenceGenerator(sequenceName="user_review_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=50, nullable=false)
     */
    private $status;

    /**
     * @var string|null
     *
     * @ORM\Column(name="comment", type="text", nullable=true)
     */
    private $comment;

    /**
     * @var CustomQuiz
     *
     * @ORM\ManyToOne(targetEntity="CustomQuiz", inversedBy="reviews")
     * @ORM\JoinColumn(name="customQuizId", referencedColumnName="id")
     */
    private $customQuiz;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="reviews")
     * @ORM\JoinColumn(name="reviewerId", referencedColumnName="id")
     */
    private $reviewer;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getCustomQuiz(): ?CustomQuiz
    {
        return $this->customQuiz;
    }

    public function setCustomQuiz(?CustomQuiz $customQuiz): self
    {
        $this->customQuiz = $customQuiz;

        return $this;
    }

    public function getReviewer(): ?User
    {
        return $this->reviewer;
    }

    public function setReviewer(?User $reviewer): self
    {
        $this->reviewer = $reviewer;

        return $this;
    }

}
