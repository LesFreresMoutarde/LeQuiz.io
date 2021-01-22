<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserReview
 *
 * @ORM\Table(name="user_review", indexes={@ORM\Index(name="user_review_reviewer_id", columns={"reviewerId"}), @ORM\Index(name="user_review_custom_quiz_id", columns={"customQuizId"}), @ORM\Index(name="user_review_status", columns={"status"})})
 * @ORM\Entity
 */
class UserReview
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="user_review_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="reviewerId", type="guid", nullable=true)
     */
    private $reviewerid;

    /**
     * @var string
     *
     * @ORM\Column(name="customQuizId", type="guid", nullable=false)
     */
    private $customquizid;

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
     * @var \CustomQuiz
     *
     * @ORM\ManyToOne(targetEntity="CustomQuiz")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""customQuizId"", referencedColumnName="id")
     * })
     */
    private $"customquizid";

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""reviewerId"", referencedColumnName="id")
     * })
     */
    private $"reviewerid";


}
